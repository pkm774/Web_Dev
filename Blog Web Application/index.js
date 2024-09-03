import express from "express";
import fs from "fs";
//import https from 'https';
import pg from "pg";
import env from "dotenv";
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local"; // local strategy
import GoogleStrategy from "passport-google-oauth2"; // google strategy

const hostname = "0.0.0.0";
const port = 8080;
const saltRounds = 15;

const app = express();
app.use(express.static("public"));
// For data passes by client as json
app.use(express.json());
// For data passes by client as encoded url
app.use(express.urlencoded({ extended: true }));

env.config();

// To save users login session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();

// check if URL includes protocol
function sanitizeUrl(url) {
  if (!/^https?:\/\//i.test(url)) {
    return "http://" + url;
  }
  return url;
}

app.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("warning.ejs", { message: "You are already logged in!" });
  } else {
    res.render("login.ejs");
  }
});

var saveSession = false;
app.post("/savesession", (req, res) => {
  saveSession = req.body.toSave;
});

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.redirect("/login");

    req.logIn(user, (err) => {
      if (err) return next(err);

      if (saveSession === "true") {
        req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 30;
        req.session.maxAge = req.session.cookie.maxAge;
        //console.log('Session will be saved for 30 days');
      } else {
        req.session.cookie.expires = false;
        req.session.maxAge = null;
        //console.log('Session will expire when the browser is closed');
      }
      return res.redirect("/home");
    });
  })(req, res, next);
});

// Get google profile
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Login to local website after google auth
app.get(
  "/auth/google/home",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    if (saveSession === "true") {
      req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 30;
      req.session.maxAge = req.session.cookie.maxAge;
      //console.log('Session will be saved for 30 days');
    } else {
      req.session.cookie.expires = false;
      req.session.maxAge = null;
      //console.log('Session will expire when the browser is closed');
    }
    res.redirect("/home");
  }
);

app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.get("/signup", async (req, res) => {
  if (req.isAuthenticated()) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/signup");
    });
  } else {
    res.render("signup.ejs");
  }
});

app.post("/signup", async (req, res) => {
  const firstname = req.body.fname;
  const lastname = req.body.lname;
  const email = req.body.email;
  const password = req.body.password;
  console.log(password);

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      res.render("signup.ejs", {
        message: "User already exist Try logging in",
      });
    } else {
      //hashing the password and saving it in the database
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          const result = await db.query(
            "INSERT INTO users (email, password, fname, lname) VALUES ($1, $2, $3, $4) RETURNING *",
            [email, hash, firstname, lastname]
          );
          const user = result.rows[0];
          req.session.user = {
            name: `${user.fname} ${user.lname}`,
            email: user.email,
          };
          req.login(user, (err) => {
            // console.log("login success");
            res.redirect("/home");
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

app.get("/", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT name, title, TO_CHAR(date, 'Month DD, YYYY') AS formatted_date, id, email FROM blogs ORDER BY id ASC;"
    );
    res.render("index.ejs", { allBlogs: result.rows });
  } catch (error) {
    console.error("Server: Error database:", error);
    res.status(500).send("Server: Internal server error");
  }
});

// Check if user is logined or not
app.get("/home", async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const result = await db.query(
        "SELECT title, TO_CHAR(date, 'DD Mon YYYY') AS formatted_date, id, email FROM blogs WHERE email=$1 ORDER BY id ASC;",
        [req.user.email]
      );
      res.render("home.ejs", { allBlogs: result.rows, user: req.user });
    } catch (error) {
      console.error("Server: Error database:", error);
      res.status(500).send("Server: Internal server error");
    }
  } else {
    // if not then login first
    res.redirect("/login");
  }
});

// Check if user is logined or not
app.get("/create", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("create.ejs", {
      name: req.user.fname + " " + req.user.lname,
      email: req.user.email,
    });
  } else {
    // if not then login first
    res.redirect("/login");
  }
});

app.post("/save", async (req, res) => {
  if (req.isAuthenticated()) {
    const blog = req.body.blog.replace(
      /href="(www\.[^\s"]+)"/g,
      (match, p1) => {
        return `href="${sanitizeUrl(p1)}"`;
      }
    );
    const d = new Date();
    var blogDate = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear();

    try {
      await db.query(
        "INSERT INTO blogs (name, title, body, date, email) VALUES ($1, $2, $3, $4, $5);",
        [req.body.name, req.body.title, blog, blogDate, req.body.email]
      );
      // OK Header Sent
      res.sendStatus(201);
    } catch (err) {
      console.log(err);
      res.status(500).send("Server: Cannot create new row");
    }
  } else {
    // if not then login first
    res.redirect("/login");
  }
});

// Using query parameters to pass additional information as key-value pairs in the URL.
app.get("/view", async (req, res) => {
  if (req.isAuthenticated()) {
    // Extract the blog post ID from the query parameter
    const postId = Number(req.query.postId);
    try {
      const result = await db.query(
        "SELECT id, name, title, body, TO_CHAR(date, 'DD Mon YYYY') AS formatted_date FROM blogs WHERE id=$1;",
        [postId]
      );
      // Render the view.ejs template and pass the blog post data
      res.render("view.ejs", { blog: result.rows[0] });
    } catch (error) {
      console.error("Server: Error database:", error);
      // Handle invalid post ID (e.g., show an error page)
      res.status(404).send(`Server: Blog post row with id ${postId} not found`);
      return;
    }
  } else {
    // if not then login first
    res.redirect("/login");
  }
});

app.get("/edit", async (req, res) => {
  if (req.isAuthenticated()) {
    // Extract the blog post ID from the query parameter
    const postId = Number(req.query.postId);
    try {
      const result = await db.query(
        "SELECT id, name, title, body FROM blogs WHERE id=$1;",
        [postId]
      );
      // Render the edit.ejs template and pass the blog post data
      res.render("edit.ejs", { passedData: result.rows[0] });
    } catch (error) {
      console.error("Server: Error database:", error);
      // Handle invalid post ID (e.g., show an error page)
      res.status(404).send(`Server: Blog post row with id ${postId} not found`);
      return;
    }
  } else {
    // if not then login first
    res.redirect("/login");
  }
});

// using PATCH endpoint to update blog
app.patch("/append", async (req, res) => {
  if (req.isAuthenticated()) {
    let id = 0;
    try {
      // Get id from the query
      const appendid = Number(req.query.blogId);
      if (!appendid) {
        return res.status(400).send("Invalid Blog Id");
      }
      id = appendid;

      try {
        await db.query("UPDATE blogs SET title=$1, body=$2 WHERE id=$3;", [
          req.body.title,
          req.body.blog,
          appendid,
        ]);
      } catch (error) {
        console.log(error);
      }
      // Send a 200 status code indicating success
      res.sendStatus(200);
    } catch (error) {
      console.error(`Server: Error updating row with id ${id}:`, error);
      res.status(500).send("Server: Internal server error");
    }
  } else {
    // if not then login first
    res.redirect("/login");
  }
});

app.delete("/delete", async (req, res) => {
  if (req.isAuthenticated()) {
    let id = 0;
    try {
      const deletedid = Number(req.body.id);
      if (!deletedid) {
        return res.status(400).send("Invalid Blog Id");
      }
      id = deletedid;

      try {
        await db.query("DELETE FROM blogs WHERE id=$1;", [deletedid]);
        console.log(`Server: Row having id ${deletedid} deleted.`);
        // OK Header Sent
        res.sendStatus(201);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(`Server: Error deleting row with id ${id}:`, error);
      res.status(404).json({ error: "Blog not found" });
    }
  } else {
    // if not then login first
    res.redirect("/login");
  }
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

// Also tell Passport to use 'useremail' instead of 'username'
passport.use(
  "local",
  new Strategy(
    { usernameField: "useremail", passwordField: "password" },
    async function verify(useremail, password, cb) {
      //console.log("Attempting to authenticate user:", useremail);
      try {
        const result = await db.query("SELECT * FROM users WHERE email = $1", [
          useremail,
        ]);

        if (result.rows.length > 0) {
          const user = result.rows[0];
          const storedHashedPassword = user.password;

          bcrypt.compare(password, storedHashedPassword, (err, matched) => {
            if (err) {
              //console.error("Error comparing passwords:", err);
              return cb(err);
            }

            if (matched) {
              // console.log("Password matched for user:", user.email);
              return cb(null, user);
            } else {
              // console.log("Password didnt matched for user:", user.email);
              return cb(null, false, { message: "Incorrect password" });
            }
          });
        } else {
          // console.log("User not found:", useremail);
          return cb(null, false, { message: "User not found" });
        }
      } catch (err) {
        console.log(err);
        return cb(err);
      }
    }
  )
);

// Google auth
passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/google/home",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const result = await db.query("SELECT * FROM users WHERE email = $1", [
          profile.email,
        ]);
        if (result.rows.length === 0) {
          const newUser = await db.query(
            "INSERT INTO users (email, password, fname, lname) VALUES ($1, $2, $3, $4)",
            [
              profile.email,
              "default-google-password",
              profile.given_name,
              profile.family_name,
            ]
          );
          return cb(null, newUser.rows[0]);
        } else {
          return cb(null, result.rows[0]);
        }
      } catch (err) {
        return cb(err);
      }
    }
  )
);

// storing the user's data
passport.serializeUser((user, cb) => {
  cb(null, user);
});

// Get the user data
passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

/*app.listen(process.env.PORT || 8080, () => {
    console.log(`Server running at ${process.env.PORT || 8080}/`);
});*/

/*https.createServer(options, app).listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});*/

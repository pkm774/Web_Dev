import React, { useState } from "react";

function App() {
  const [contact, setContact] = useState({
    fName: "",
    lName: "",
    email: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setContact((preVal) => {
      if (name === "fName") {
        return {
          fName: value,
          lName: preVal.lName,
          email: preVal.email,
        };
      } else if (name === "lName") {
        return {
          fName: preVal.fName,
          lName: value,
          email: preVal.email,
        };
      } else if (name === "email") {
        return {
          fName: preVal.fName,
          lName: preVal.lName,
          email: value,
        };
      }
    });
  }

  return (
    <div className="container">
      <h1>
        Hello {contact.fName} {contact.lName}
      </h1>
      <p>{contact.email}</p>
      <form>
        <input
          name="fName"
          onChange={handleChange}
          value={contact.fName}
          placeholder="First Name"
        />
        <input
          name="lName"
          onChange={handleChange}
          value={contact.lName}
          placeholder="Last Name"
        />
        <input
          name="email"
          onChange={handleChange}
          value={contact.email}
          placeholder="Email"
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;

import React, { useState } from "react";

function App() {
  {
/*
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  function UpdateFname(event){
    setFname(event.target.value);
  }

  function UpdateLname(event){
    setLname(event.target.value);
  }

  return (
    <div className="container">
      <h1>Hello {fname} {lname} </h1>
      <form>
        <input onChange={UpdateFname} name="fName" placeholder="First Name" value={fname}/>
        <input onChange={UpdateLname} name="lName" placeholder="Last Name" value={lname}/>
        <button>Submit</button>
      </form>
    </div>
  );
*/
  }

  const [name, setName] = useState({
    fname: "",
    lname: "",
  });

  function UpdateName(event) {
    const { name, value } = event.target;

    setName((preVal) => {
      if (name === "fName") {
        return {
          fname: value,
          lname: preVal.lname,
        };
      } else if (name === "lName") {
        return {
          fname: preVal.fname,
          lname: value,
        };
      }
    });
  }

  return (
    <div className="container">
      <h1>
        Hello {name.fname} {name.lname}
      </h1>
      <form>
        <input
          onChange={UpdateName}
          name="fName"
          placeholder="First Name"
          value={name.fname}
        />
        <input
          onChange={UpdateName}
          name="lName"
          placeholder="Last Name"
          value={name.lname}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;

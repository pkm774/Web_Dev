import React from "react";
import contacts from "../contacts";

function Components(props) {
  return (
    <div className="card">
      <div className="top">
        <h2 className="name">{props.name}</h2>
        <img className="circle-img" src={props.image} alt="avatar_img" />
      </div>
      <div className="bottom">
        <p className="info">{props.phoneno}</p>
        <p className="info">{props.email}</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <div>
      <h1 className="heading">My Contacts</h1>;
      {contacts.map((contact) => (
        <Components
          name={contact.name}
          image={contact.imgURL}
          phoneno={contact.phone}
          email={contact.email}
        />
      ))}
    </div>
  );
}

export default App;

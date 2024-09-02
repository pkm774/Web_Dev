import React from "react";
import contacts from "../contacts";
import Card from "./Card";

function App() {
  return (
    <div>
      <h1 className="heading">My Contacts</h1>;
      {contacts.map((contact) => (
        <Card
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

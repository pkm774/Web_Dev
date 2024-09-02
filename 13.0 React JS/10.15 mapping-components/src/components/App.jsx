import React from "react";
import contacts from "../contacts";
import Card from "./Card";

function createContacts(contact) {
  return <Card
    id={contact.id}
    name={contact.name}
    image={contact.imgURL}
    phoneno={contact.phone}
    email={contact.email}
  />;
}

function App() {
  return (
    <div>
      <h1 className="heading">My Contacts</h1>
      {contacts.map(createContacts)}
    </div>
  );
}

export default App;

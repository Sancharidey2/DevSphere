import React, { useState } from "react";
import "../Contact.css";
import firebaseDb from "../Firebase";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [loader, setLoader] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    firebaseDb
      .child("contacts")
      .push({
        name: name,
        email: email,
        message: message,
      })
      .then(() => {
        setLoader(false);
        alert("Your message has been submitted👍");
      })
      .catch((error) => {
        alert(error.message);
        setLoader(false);
      });

    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="app">
      <form className="form" onSubmit={handleSubmit}>
        <br></br>
        <br></br>
        <h1>Contact CrownBank</h1>
        <label>Name</label>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Email</label>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Message</label>
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>

        <button
          type="submit"
          style={{ background: loader ? "#ccc" : " green" }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;

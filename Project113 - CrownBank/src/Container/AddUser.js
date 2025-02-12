import React from "react";
import AddUserForm from "./AddUserForm";
import firebaseDb from "../Firebase";

const AddUSer = () => {
  const addOrEdit = (obj) => {
    firebaseDb.child("Users").push(obj, (err) => {
      if (err) console.log(err);
    });
  };

  return (
    <div className="container">
      <div className="py-4">
        <AddUserForm addOrEdit={addOrEdit} />
      </div>
    </div>
  );
};

export default AddUSer;

import moment from "moment";
import React from "react";
import { useState, useEffect } from "react";
import firebaseDb from "../Firebase";

const History = () => {
  var [userObjects, setUserObjects] = useState({});
  useEffect(() => {
    firebaseDb.child("Transactions").on("value", (snapshot) => {
      if (snapshot.val() != null)
        setUserObjects({
          ...snapshot.val(),
        });
      else setUserObjects({});
    });
  }, []);

  return (
    <div className="py-4">
      <div className="row">
        <div className="col-md-8 offset-md-1">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                {/* <th scope="col">S.No.</th> */}
                <th scope="col">Sender Email</th>
                <th scope="col">Receiver Email</th>
                <th scope="col">Amount(₹)</th>
                <th scope="col">Time</th>
              </tr>
            </thead>
            <tbody className="box-color">
              {Object.keys(userObjects).map((id) => {
                return (
                  <tr key={id}>
                    {/* <th scope="row"></th> */}
                    <td>{userObjects[id].senderEmail}</td>
                    <td>{userObjects[id].receiverEmail}</td>
                    <td>{userObjects[id].amount}₹</td>
                    <td>
                      {moment(Number(userObjects[id].time)).format("h:mm A ll")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;

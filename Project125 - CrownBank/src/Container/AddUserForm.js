import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import EmailIcon from "@material-ui/icons/Email";
import AccountBalanceWalletOutlinedIcon from "@material-ui/icons/AccountBalanceWalletOutlined";

const AddUSerForm = (props) => {
  let hist = useHistory();
  const initialFieldValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: "",
  };

  var [values, setValues] = useState(initialFieldValues);

  const handleInputChange = (e) => {
    var { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    props.addOrEdit(values);
    hist.push("/ViewCustomer");
  };

  return (
    <div className="container">
      <div className="py-4">
        <form autoComplete="off" onSubmit={handleFormSubmit}>
          <div className="form-row">
            <div className="form-group input-group col-md-4">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <PersonIcon />
                </div>
              </div>
              <input
                className="form-control"
                placeholder="First Name"
                name="firstName"
                value={values.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group input-group col-md-4">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <PersonIcon />
                </div>
              </div>
              <input
                className="form-control"
                placeholder="Last Name"
                name="lastName"
                value={values.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group input-group col-md-4">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <EmailIcon />
                  {/* <i className="fas fa-envelope"></i> */}
                </div>
              </div>
              <input
                className="form-control"
                placeholder="E-mail"
                name="email"
                type="email"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={values.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group input-group col-md-4">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <PhoneAndroidIcon />
                  {/* <i className="fas fa-envelope"></i> */}
                </div>
              </div>
              <input
                className="form-control"
                placeholder="Phone"
                name="phone"
                value={values.Phone}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group input-group col-md-4">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  {/* <i className="fas fa-envelope"></i> */}
                  <AccountBalanceWalletOutlinedIcon />
                </div>
              </div>
              <input
                className="form-control"
                placeholder="Balance"
                name="balance"
                value={values.balance}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group col-md-2">
              <input
                type="submit"
                value="Add User"
                className="btn btn-primary btn-block"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUSerForm;

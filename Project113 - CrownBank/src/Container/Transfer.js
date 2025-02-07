import React from "react";
import { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import firebaseDb from "../Firebase";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    marginTop: 60,
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
}));

const History = () => {
  const classes = useStyles();

  const initialFieldValues = {
    senderEmail: "",
    receiverEmail: "",
    amount: "",
    time: "",
  };

  var [values, setValues] = useState(initialFieldValues);

  const handleInputChange = (e) => {
    var { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const addOrEditTransfer = (obj) => {
    values.time = moment().valueOf().toString();
    firebaseDb
      .child("Transactions")
      .push(obj, (err) => {
        if (err) console.log(err);
      })
      .then(() => {
        alert("Transfered Succesfully");
      })
      .catch((error) => {
        alert(error.messagge);
      });
  };

  const handleTransfer = (e) => {
    if (values.amount === 0 || values.amount < 0) {
      alert("Invalid Amount");
      return;
    }
    e.preventDefault();
    addOrEditTransfer(values);
  };

  //  const handleTransfer = async () => {
  //     if (values.amount == 0 || values.amount < 0){
  //       alert('Invalid Amount');
  //       return
  //     }
  //     e.preventDefault();
  //     addOrEditTransfer(values)
  // }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item xs>
            <Typography>
              <TextField
                required
                variant="filled"
                autoFocus
                margin="dense"
                id="name"
                label="Your Email"
                type="email"
                name="senderEmail"
                value={values.senderEmail}
                onChange={handleInputChange}
                fullWidth
              />

              <TextField
                required
                variant="filled"
                margin="dense"
                id="name"
                label="Friend Email"
                type="email"
                name="receiverEmail"
                value={values.receiverEmail}
                onChange={handleInputChange}
                fullWidth
              />

              <TextField
                required
                variant="filled"
                margin="dense"
                id="name"
                label="Amount"
                name="amount"
                value={values.amount}
                onChange={handleInputChange}
                fullWidth
              />

              {/* <Button color="primary" onClick={handleTransfer}>
                Cancel
            </Button> */}
              <Button color="primary" onClick={handleTransfer}>
                Transfer
              </Button>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default History;

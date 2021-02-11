import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { v4 as uuidv4 } from "uuid";
import firebase from "../firebase";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const NewQrModal = ({ open, setOpen, user }) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [data, setData] = useState("");
  const [codes, setCodes] = useState([]);
  const [description, setDescription] = useState("");
  const [newTags, setNewTags] = useState("");
  const [passBool, setPassBool] = useState(false);
  const [password, setPassword] = useState("");
  const rootURL = "https://chart.googleapis.com/chart?";
  const [timer, setTimer] = React.useState("");
  const [timerBool, setTimerBool] = useState(0);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeTimer = (event) => {
    setTimer(event.target.value);
  };

  const handleSubmit = async () => {
    let codeArr = [];
    let tagArr = [];
    let currTags = [];
    if (!user) {
      console.log("waiting to connect");
    } else {
      const docRef = firebase.db.collection("users").doc(user.uid);
      const snapshot = await docRef.get();
      tagArr.push(newTags.split(","));
      console.log(tagArr);
      const newCode = {
        id: uuidv4(),
        name: name,
        data: `${rootURL}cht=qr&chs=150x150&chl=${data}`,
        description: description,
        tags: newTags,
        passwordProtect: passBool,
        password: password,
        created: Date.now(),
        timer: timer,
      };
      console.log(snapshot.data());
      setCodes(snapshot.data().qrCodes);
      codeArr.push(newCode, ...snapshot.data().qrCodes);
      console.log(codeArr);
      docRef.update({ qrCodes: codeArr });
      codeArr = [];
    }
  };

  const handleChange = (e) => {
    setPassBool(e.target.checked);
    console.log(e.target.checked);
  };

  const handleChangeTimerBool = (e) => {
    setTimerBool(e.target.checked);
    console.log(e.target.checked);
  };

  return (
    <div className="newqr-modal">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="data"
            label="Link"
            type="name"
            value={data}
            onChange={(e) => setData(e.target.value)}
            fullWidth
          />{" "}
          <TextField
            autoFocus
            margin="dense"
            id="data"
            label="Decription"
            type="name"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={passBool}
                onChange={handleChange}
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            }
            label="Password?"
          ></FormControlLabel>
          {passBool && (
            <TextField
              autoFocus
              margin="dense"
              id="data"
              label="Password"
              type="name"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
          )}
          <FormControlLabel
            control={
              <Checkbox
                checked={timerBool}
                onChange={handleChangeTimerBool}
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            }
            label="Timer?"
          ></FormControlLabel>
          {timerBool && (
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Timer</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={timer}
                onChange={handleChangeTimer}
              >
                <MenuItem value={600}>10 Min</MenuItem>
                <MenuItem value={1200}>20 Min</MenuItem>
                <MenuItem value={1800}>30 Min</MenuItem>
              </Select>
            </FormControl>
          )}
          <TextField
            autoFocus
            margin="dense"
            id="data"
            label="Tags"
            type="name"
            value={newTags}
            onChange={(e) => setNewTags(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add QR
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NewQrModal;

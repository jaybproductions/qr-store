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

const NewQrModal = ({ open, setOpen, user }) => {
  const [name, setName] = useState("");
  const [data, setData] = useState("");
  const [codes, setCodes] = useState([]);
  const [description, setDescription] = useState("");
  const [newTags, setNewTags] = useState("");
  const [passBool, setPassBool] = useState(false);
  const [password, setPassword] = useState("");
  const rootURL = "https://chart.googleapis.com/chart?";

  const handleClose = () => {
    setOpen(false);
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

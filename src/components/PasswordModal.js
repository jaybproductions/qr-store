import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const PasswordModal = ({ open, setOpen, handleClose, pass, bool, setBool }) => {
  const [password, setPassword] = useState("");
  const handleSubmit = () => {
    if (pass === password) {
      console.log("correct password");
      setBool(false);
    }
  };
  return (
    <div className="password-modal">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Enter Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the password to reveal this code.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="name"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Unlock Code
        </Button>
      </Dialog>
    </div>
  );
};

export default PasswordModal;

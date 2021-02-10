import React, { useState, useEffect } from "react";
import LockIcon from "@material-ui/icons/Lock";
import PasswordModal from "./PasswordModal";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

import copy from "copy-to-clipboard";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",

    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  largeIcon: {
    fontSize: "3em",
  },
}));

const QrCode = ({
  user,
  image,
  name,
  tags,
  passBool,
  password,
  description,
  id,
}) => {
  const codeUrl = image;
  const [open, setOpen] = useState(false);
  const [bool, setBool] = useState(passBool);
  const classes = useStyles();
  const [openAlert, setOpenAlert] = React.useState(false);
  const [linkCopy, setLinkCopy] = useState(`/user/${user.uid}/code/${id}`);
  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    setOpenAlert(true);
    let domain = window.location.host;
    domain.split("/", 1);
    console.log(domain + linkCopy);
    copy(domain + linkCopy);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      setOpenAlert(false);
      return;
    }

    setOpen(false);
  };

  const handleSubmit = () => {};
  return (
    <>
      <h5>{name}</h5>
      {bool ? (
        <>
          <PasswordModal
            open={open}
            setOpen={setOpen}
            handleClose={handleClose}
            pass={password}
            handleSubmit={handleSubmit}
            bool={bool}
            setBool={setBool}
          />
          <Link onClick={(e) => setOpen(true)}>
            <LockIcon style={{ fontSize: "50px" }} />
          </Link>
        </>
      ) : (
        <>
          <div className="code">
            <img src={codeUrl} />
          </div>
          <div className="copy-button" style={{ paddingBottom: "10px" }}>
            <Button
              aria-describedby={id}
              variant="contained"
              color="primary"
              onClick={handleClick}
              size="small"
            >
              Click to Copy Link
            </Button>
          </div>

          <p>Description: {description}</p>
          <Snackbar
            open={openAlert}
            autoHideDuration={3000}
            onClose={handleCloseAlert}
          >
            <Alert onClose={handleCloseAlert} severity="success">
              Link has been copied
            </Alert>
          </Snackbar>
        </>
      )}

      <p>Tags: {tags}</p>
    </>
  );
};

export default QrCode;

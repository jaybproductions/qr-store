import React, { useState, useEffect } from "react";
import LockIcon from "@material-ui/icons/Lock";
import PasswordModal from "./PasswordModal";
import { Link } from "react-router-dom";

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
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {};
  return (
    <>
      <p>{name}</p>
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
            <LockIcon />
          </Link>
        </>
      ) : (
        <>
          <Link to={`/user/${user.uid}/code/${id}`}>
            <img src={codeUrl} />
          </Link>{" "}
          <p>{description}</p>
        </>
      )}

      <p>Tags: {tags}</p>
    </>
  );
};

export default QrCode;

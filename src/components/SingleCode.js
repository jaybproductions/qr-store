import React, { useState, useEffect } from "react";
import LockIcon from "@material-ui/icons/Lock";
import PasswordModal from "./PasswordModal";
import { Link } from "react-router-dom";

const SingleCode = ({
  user,
  image,
  id,
  name,
  tags,
  passBool,
  password,
  description,
}) => {
  const [open, setOpen] = useState(false);
  let bool2 = passBool;
  const [bool, setBool] = useState(bool2);
  useEffect(() => {
    setBool(bool2);
  }, [bool2]);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <p>{name}</p>
      {bool === undefined || bool ? (
        <>
          <PasswordModal
            open={open}
            setOpen={setOpen}
            handleClose={handleClose}
            pass={password}
            bool={bool}
            setBool={setBool}
          />
          <Link onClick={(e) => setOpen(true)}>
            <LockIcon fontSize="large" />
          </Link>
        </>
      ) : (
        <p>
          <img src={image} />

          <p>{description}</p>
        </p>
      )}

      <p>Tags: {tags}</p>
    </>
  );
};

export default SingleCode;

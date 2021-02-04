import React from "react";
import QrCode from "../components/qrCode";
import { Link } from "react-router-dom";
import SingleCode from "../components/SingleCode";
const SingleContainer = ({ single, user }) => {
  return (
    <>
      <SingleCode
        user={user}
        id={single.id}
        image={single.data}
        name={single.name}
        tags={single.tags}
        passBool={single.passwordProtect}
        password={single.password}
        description={single.description}
      />
    </>
  );
};

export default SingleContainer;

import React from "react";
import QrCode from "../components/qrCode";
import { Link } from "react-router-dom";
const QrCodeList = ({ qrcodes, user }) => {
  return (
    <>
      {qrcodes.map((code, index) => (
        <>
          <QrCode
            user={user}
            id={code.id}
            image={code.data}
            name={code.name}
            tags={code.tags}
            passBool={code.passwordProtect}
            password={code.password}
            description={code.description}
          />
        </>
      ))}
    </>
  );
};

export default QrCodeList;

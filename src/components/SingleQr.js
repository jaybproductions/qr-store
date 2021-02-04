import React, { useContext, useState, useEffect } from "react";
import firebase from "../firebase";
import UserContext from "../contexts/UserContext";
import { useParams } from "react-router-dom";
import QrCode from "./qrCode";
import LockIcon from "@material-ui/icons/Lock";
import PasswordModal from "./PasswordModal";
import SingleCode from "./SingleCode";
import SingleContainer from "./SingleContainer";

const SingleQR = () => {
  let { codeId } = useParams();
  let { userId } = useParams();
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({});
  const { user } = useContext(UserContext);

  useEffect(() => {
    getData();
  }, [codeId, user]);

  const getData = async () => {
    if (!user) {
      console.log("waiting to connect");
      const docRef = firebase.db.collection("users").doc(userId);
      const snapshot = await docRef.get();
      const qrCodeData = snapshot.data().qrCodes;
      setData(qrCodeData);
      let filtered = snapshot.data().qrCodes.filter((code, index) => {
        console.log(code.id, codeId);
        return code.id === codeId;
      });

      const filtData = filtered[0];
      setFilter(filtData);
    } else {
      const docRef = firebase.db.collection("users").doc(user.uid);
      const snapshot = await docRef.get();
      const qrCodeData = snapshot.data().qrCodes;
      setData(qrCodeData);
      let filtered = snapshot.data().qrCodes.filter((code, index) => {
        return code.id === codeId;
      });

      const filtData = filtered[0];
      console.log(filtered[0]);
      setFilter(filtData);
    }
  };

  return (
    <div className="single">
      <div className="single-header">
        <h4>
          This is a shareable code - Please provide password and link to whoever
          you would like to share this code with.
        </h4>
      </div>
      <SingleContainer single={filter} />
    </div>
  );
};

export default SingleQR;

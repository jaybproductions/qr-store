import React, { useContext, useState, useEffect } from "react";
import firebase from "../firebase";
import UserContext from "../contexts/UserContext";
import { useParams } from "react-router-dom";
import QrCode from "./qrCode";
import LockIcon from "@material-ui/icons/Lock";
import PasswordModal from "./PasswordModal";
import SingleCode from "./SingleCode";
import SingleContainer from "./SingleContainer";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "inline-block",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

const SingleQR = () => {
  const classes = useStyles();
  let { codeId } = useParams();
  let { userId } = useParams();
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({});
  const { user } = useContext(UserContext);
  const [available, setAvailable] = useState(false);
  const [loading, setLoading] = useState(true);

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
      setFilter(filtData);
    }
  };

  useEffect(() => {
    if (Object.keys(filter).length === 0) return;
    CheckTime();
    setLoading(false);
  }, [filter]);

  const CheckTime = () => {
    const timer = filter.timer;
    const currTempTime = Date.now();
    const dateInSecs = Math.round(currTempTime / 1000);
    const createdToSecs = Math.round(filter.created / 1000);
    const expirationTime = createdToSecs + timer;
    console.log(
      "created: ",
      createdToSecs,
      "expires: ",
      expirationTime,
      "current: ",
      dateInSecs
    );

    if (expirationTime > dateInSecs) {
      setAvailable(true);
    } else {
      return;
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
      {loading ? (
        <div className={classes.root}>
          <CircularProgress size={60} />{" "}
        </div>
      ) : (
        <>
          {" "}
          {available && (
            <>
              <SingleContainer single={filter} />{" "}
            </>
          )}
          {!available && (
            <>
              <div>This code has expired...</div>
            </>
          )}{" "}
        </>
      )}
    </div>
  );
};

export default SingleQR;

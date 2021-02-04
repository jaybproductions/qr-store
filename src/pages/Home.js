import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import QrCode from "../components/qrCode";
import firebase from "../firebase";
import UserContext from "../contexts/UserContext";
import NewQrModal from "../components/NewQrModal";
import QrCodeList from "../components/QrCodeList";

const Home = () => {
  const [data, setData] = useState([]);
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getData();
  }, [user]);

  const handleOpen = () => {
    setOpen(true);
  };

  const getData = async () => {
    if (!user) {
      console.log("waiting to connect");
    } else {
      const docRef = firebase.db.collection("users").doc(user.uid);
      const snapshot = await docRef.get();
      console.log(snapshot);
      const qrCodeData = snapshot.data().qrCodes;
      setData(qrCodeData);
    }
  };
  return (
    <div className="home">
      {user ? (
        <>
          {" "}
          <button className="btn btn-success" onClick={() => setOpen(true)}>
            New QR Code
          </button>
          <h3>Your QR Code Bank</h3>
          <NewQrModal open={open} setOpen={setOpen} user={user} />
          <QrCodeList qrcodes={data} user={user} />
        </>
      ) : (
        <>
          <h1>Welcome to QR Store</h1>
          <p>Please login to access your QR Codes</p>
        </>
      )}
    </div>
  );
};

export default Home;

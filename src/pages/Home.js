import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import QrCode from "../components/qrCode";
import firebase from "../firebase";
import UserContext from "../contexts/UserContext";
import NewQrModal from "../components/NewQrModal";
import QrCodeList from "../components/QrCodeList";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [data, setData] = useState([]);
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [filtData, setFiltData] = useState([]);
  let filtArr = [];

  useEffect(() => {
    getData();
  }, [user]);

  useEffect(() => {
    getFilteredData();
  }, [user, filteredData]);

  const handleOpen = () => {
    setOpen(true);
  };

  const getData = async () => {
    if (!user) {
      console.log("waiting to connect");
    } else {
      const docRef = firebase.db.collection("users").doc(user.uid);
      const snapshot = await docRef.get();
      const qrCodeData = snapshot.data().qrCodes;
      setData(qrCodeData);
    }
  };

  const getFilteredData = async () => {
    if (!user) {
      console.log("waiting to connect");
    } else {
      const docRef = firebase.db.collection("users").doc(user.uid);
      const snapshot = await docRef.get();
      const qrCodeData = snapshot.data().qrCodes;
      qrCodeData.forEach((code, index) => {
        filteredData.map((tag, index) => {
          if (code.tags.includes(tag)) {
            filtArr.push(code);
          }
        });
      });

      setFiltData(filtArr);
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
          <SearchBar
            filteredData={filteredData}
            setFilteredData={setFilteredData}
          />
          <NewQrModal open={open} setOpen={setOpen} user={user} />
          {filteredData.length > 0 ? (
            <>
              {" "}
              <QrCodeList qrcodes={filtData} user={user} />
            </>
          ) : (
            <>
              <QrCodeList qrcodes={data} user={user} />
            </>
          )}
          <br />
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

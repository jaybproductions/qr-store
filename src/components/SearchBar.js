import React, { useEffect, useState, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import UserContext from "../contexts/UserContext";
import firebase from "../firebase";
import Chip from "@material-ui/core/Chip";

export default function SearchBar({ filteredData, setFilteredData }) {
  const [data, setData] = useState([]);
  const { user } = useContext(UserContext);
  let fixedOptions = [];
  let filteredTags = [];
  const [tags, setTags] = React.useState([]);

  useEffect(() => {
    getData();
  }, [user]);

  const getData = () => {
    if (!user) {
      console.log("waiting to connect...");
    } else {
      const docRef = firebase.db.collection("users").doc(user.uid);
      docRef.get().then((doc) => {
        const codes = doc.data().qrCodes;
        codes.forEach((code) => {
          if (!filteredTags.includes(code.tags) && code.tags !== "") {
            filteredTags.push(code.tags);
          }
        });
        setData(codes);
        setTags(filteredTags);
      });
    }
  };
  return (
    <div style={{ width: 300, margin: "auto" }}>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={data.map((option) => option.name)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search by Name..."
            margin="normal"
            variant="outlined"
          />
        )}
      />
      <Autocomplete
        multiple
        id="tags-filled"
        options={tags.map((option) => option)}
        defaultValue={fixedOptions}
        freeSolo
        renderTags={(tags, getTagProps) =>
          tags.map((option, index) => (
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
            />
          ))
        }
        onChange={(event, newValue) => {
          setFilteredData([
            ...newValue.filter((option) => fixedOptions.indexOf(option) === -1),
          ]);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            label="Search by tag..."
            placeholder="Add a tag.."
          />
        )}
      />
    </div>
  );
}

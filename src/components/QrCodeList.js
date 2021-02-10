import React from "react";
import QrCode from "../components/qrCode";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "auto",
    width: "50%",

    padding: "10px",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const QrCodeList = ({ qrcodes, user }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {qrcodes.map((code, index) => (
          <>
            <Grid item xs={3} alignItems="stretch">
              <Paper className={classes.paper}>
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
              </Paper>
            </Grid>
          </>
        ))}
      </Grid>
    </div>
  );
};

export default QrCodeList;

import React, { useState } from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import LoadingButton from "@mui/lab/LoadingButton";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

export default function AddTrayButton() {
  const navigate = useNavigate();

  // const mockFirebaseGetData = new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     console.log("resolving");
  //     resolve(true);
  //   }, 5000);
  // });

  // Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Form
  const [isLoading, setIsLoading] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [rowsError, setRowsError] = useState(false);
  const [columnsError, setColumnsError] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const trayName = data.get("trayName");
    const rows = data.get("rows");
    const columns = data.get("columns");
    const about = data.get("about");
    const uid = uuidv4();

    console.log({
      uid: uid,
      trayName: trayName,
      rows: rows,
      columns: columns,
      about: about
    });

    // Try and get these to update to false after typing instead of
    // onSubmit
    if (!trayName) {
      setNameError(true);
    } else {
      setNameError(false);
    }
    if (!rows) {
      setRowsError(true);
    } else {
      setRowsError(false);
    }
    if (!columns) {
      setColumnsError(true);
    } else {
      setColumnsError(false);
    }
    if (trayName && rows && columns) {
      console.log("Creating Tray!");
      setIsLoading(true);
      // Wait for a success and then direct user to new tray
      // mockFirebaseGetData.then((result) => {
      //   console.log(result);
      //   setIsLoading(false);
      //   handleClose();
      // });

      // 1 second delay for animation
      setTimeout(function () {
        setIsLoading(false);
        handleClose();
        navigate(uid);
      }, 1000);
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 400,
    bgcolor: "background.paper",
    border: "1px solid #000",
    borderRadius: "8px",
    boxShadow: 24,
    p: 4
  };
  return (
    <>
      <Button
        onClick={handleOpen}
        variant="contained"
        color="success"
        Success
        endIcon={<AddIcon />}
      >
        Add Tray
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" onSubmit={handleSubmit} noValidate sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            gutterBottom
          >
            Add A Seed Tray
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Tray Name"
                id="trayName"
                name="trayName"
                variant="outlined"
                error={nameError}
                required
                fullWidth
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Rows"
                id="rows"
                name="rows"
                variant="outlined"
                type="number"
                error={rowsError}
                fullWidth
                required
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Columns"
                id="columns"
                name="columns"
                variant="outlined"
                type="number"
                error={columnsError}
                fullWidth
                required
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="About"
                id="about"
                name="about"
                multiline
                rows={4}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton
                type="submit"
                variant="contained"
                color="success"
                size="large"
                loading={isLoading}
                fullWidth
              >
                Create
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}

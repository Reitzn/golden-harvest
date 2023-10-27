import React, { useState } from "react";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { useAuth } from "../../context/AuthContext";

import { LoadingButton } from "@mui/lab";

export default function EditProfileButton(props) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { user, updateUser } = useAuth();

  const handleClose = () => setOpen(false);

  const handleSubmit = (event) => {
    setIsLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    updateUser(data.get("firstName"), data.get("lastName")).then(
      () => {
        setIsLoading(false);
        handleClose();
      }
    );
  };

  // Style for modal, mostly from MUI
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
    p: 4,
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="contained" color="success">
        Edit Profile
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            gutterBottom
          >
            Edit Location
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  variant="outlined"
                  defaultValue={user?.firstName}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  variant="outlined"
                  defaultValue={user?.lastName}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isLoading}
                  color="success"
                  size="large"
                  fullWidth
                >
                  Update
                </LoadingButton>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

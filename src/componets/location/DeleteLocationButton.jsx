import React, {useState} from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

export default function DeleteLocationButton(props) {
  const [open, setOpen] = useState(false);
  const { deleteLocation } = useAuth();

  const { locationUid } = props;
  const navigate = useNavigate();

  const confirmDeletePlant = () => {
    deleteLocation(locationUid).then((e) => {
      navigate("/locations");
    });
  };

  return (
    <>
      <Button
        variant="contained"
        color="error"
        onClick={() => setOpen(true)}
        startIcon={<DeleteIcon />}
      >
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this location?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button color="error" onClick={confirmDeletePlant} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

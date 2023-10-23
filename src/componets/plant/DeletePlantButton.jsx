import React from "react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

export default function DeletePlantButton(props) {
  const [open, setOpen] = React.useState(false);

  const { deletePlant } = useAuth();

  const { plantUid } = props;
  const navigate = useNavigate();

  const confirmDeletePlant = () => {
    deletePlant(plantUid).then(() => {
      navigate("/plants");
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
            Are you sure you want to delete this plant?
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

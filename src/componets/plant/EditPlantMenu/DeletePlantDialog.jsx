import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useParams } from "react-router-dom";

export default function DeletePlantDialog(props) {
  const { deletePlant } = useAuth();
  const { isDialogOpen, setIsDialogOpen } = props;
  let { plantUid } = useParams();

  const navigate = useNavigate();

  const confirmDeletePlant = () => {
    deletePlant(plantUid).then(() => {
      navigate("/plants");
    });
  };

  return (
    <>
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this Plant?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button color="error" onClick={confirmDeletePlant} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

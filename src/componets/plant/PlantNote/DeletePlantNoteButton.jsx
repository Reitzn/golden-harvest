import React from "react";

import { useAuth } from "../../../context/AuthContext";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DeletePlantNoteButton(props) {
  const { plantUid, date, action, note } = props;
  const { deletePlantNote } = useAuth();

  const handleClick = () => {
    deletePlantNote(plantUid, date, action, note);
  };

  return (
    <IconButton onClick={handleClick} aria-label="delete">
      <DeleteIcon />
    </IconButton>
  );
}

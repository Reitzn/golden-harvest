import React from "react";

import { useParams } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

import DeletePlantNoteButton from "./DeletePlantNoteButton";
import AddPlantNoteButton from "./AddPlantNoteButton";

import moment from "moment";

export default function PlantNotes(props) {
  const { notes } = props;
  let { plantUid } = useParams();

  return (
    <>
      <List
        sx={{
          width: "100%",
          // maxWidth: 360,
          bgcolor: "background.paper",
        }}
      >
        {notes?.map((note) => (
          <>
            {/* maybe i could do better with a key but.... will they ever be the same? lol */}
            <ListItem key={note.note}>
              <ListItemText
                primary={note.action}
                secondary={moment.unix(note.date).format("MM/DD/YYYY")}
              />
              <ListItemText secondary={note.note} />
              <DeletePlantNoteButton plantUid={plantUid} {...note} />
            </ListItem>
            <Divider component="li" />
          </>
        ))}
      </List>
      <AddPlantNoteButton plantUid={plantUid} />
    </>
  );
}

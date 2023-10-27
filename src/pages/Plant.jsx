import React from "react";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { Container, Grid } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Box } from "@mui/material";

import EditPlantMenu from "../componets/plant/EditPlantMenu/EditPlantMenu";
import AddPlantNoteButton from "../componets/plant/PlantNote/AddPlantNoteButton";
import DeletePlantNoteButton from "../componets/plant/PlantNote/DeletePlantNoteButton";

import moment from "moment";

import { PageItem } from "../componets/shared/PageItem";

export default function PlantPage() {
  const { plants, locations } = useAuth();
  let { plantUid } = useParams();

  const plant = plants?.find((plant) => plant.uid === plantUid);

  const plantLocation = locations?.find((location) => location?.uid === plant?.location);

  // https://smartdevpreneur.com/setting-material-ui-grid-item-height/

  return (
    <Container>
      <Grid container direction="row" alignItems="center">
        <Grid container item xs={10} justifyContent="flex-start">
          <h1>{plant?.name}</h1>
        </Grid>
        <Grid container item xs={2} justifyContent="flex-end">
          <EditPlantMenu />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <PageItem>
            {/* <AspectRatio objectFit="contain"> */}
            <img
              src={plant?.imgUrl}
              alt=""
              style={{ maxWidth: "-webkit-fill-available", maxHeight: "250px" }}
            />
            {/* </AspectRatio> */}
          </PageItem>
        </Grid>
        <Grid item xs={12} md={6}>
          <PageItem>
            <h2>About</h2>
            <Grid container spacing={2}>
              {/* <Grid item xs={6} md={3}>
                <b>Plant Number:</b>
              </Grid>
              <Grid item xs={6} md={3}>
                {plant?.plantNumber}
              </Grid> */}
              <Grid item xs={6} md={3}>
                <b>Variety:</b>
              </Grid>
              <Grid item xs={6} md={3}>
                {plant?.name}
              </Grid>
              <Grid item xs={6} md={3}>
                <b>Scientific Name:</b>
              </Grid>
              <Grid item xs={6} md={3}>
                {plant?.scientificName}
              </Grid>
              <Grid item xs={6} md={3}>
                <b>Location:</b>
              </Grid>
              <Grid item xs={6} md={3}>
                {plantLocation?.name}
              </Grid>
              {/*<Grid item xs={6} md={3}>
                <b>Origin:</b>
              </Grid>
              <Grid item xs={6} md={3}>
                {plant?.origin}
              </Grid>
              <Grid item xs={6} md={3}>
                <b>Date:</b>
              </Grid>
              <Grid item xs={6} md={3}>
                {plant?.date?.toDate().toLocaleTimeString("en-US")}
              </Grid> */}
            </Grid>
          </PageItem>
        </Grid>
        <Grid item xs={12}>
          <PageItem>
            <h2>Notes</h2>
            <List
              sx={{
                width: "100%",
                // maxWidth: 360,
                bgcolor: "background.paper",
              }}
            >
              {plant?.notes?.map((note) => (
                <>
                  {/* maybe i could do better with a key but.... will they ever be the same? lol */}
                  <ListItem key={note.note}>
                    <ListItemText primary={note.action} secondary={moment.unix(note.date).format("MM/DD/YYYY")} />
                    <ListItemText secondary={note.note} />
                    <DeletePlantNoteButton plantUid={plantUid} {...note}  />
                  </ListItem>
                  <Divider component="li" />
                </>
              ))}
            </List>
            <AddPlantNoteButton plantUid={plantUid} />
          </PageItem>
        </Grid>
        <Grid item xs={12}>
          <PageItem>
            <h2>Images</h2>
            <Box
              m={3}
              display="flex"
              justifyContent="flex-end"
              alignItems="flex-end"
            >
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                <input hidden accept="image/*" type="file" />
                <PhotoCamera />
              </IconButton>
            </Box>
          </PageItem>
        </Grid>
      </Grid>
    </Container>
  );
}

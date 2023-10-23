import React from "react";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { Container, Grid, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Box } from "@mui/material";

import DeletePlantButton from "../componets/plant/DeletePlantButton";
import EditPlantButton from "../componets/plant/EditPlantButton";

export default function PlantPage() {
  const { plants } = useAuth();
  let { plantUid } = useParams();

  const plant = plants?.find((plant) => plant.uid === plantUid);

  console.log(plant);

  // Defult code from MUI for grid examples.
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  // https://smartdevpreneur.com/setting-material-ui-grid-item-height/

  return (
    <Container>
      <h1>{plant?.name}</h1>
      <Box m={3} display="flex" justifyContent="flex-end" alignItems="flex-end">
        <EditPlantButton plantUid={plantUid} />
        <DeletePlantButton plantUid={plantUid} />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Item>
            {/* <AspectRatio objectFit="contain"> */}
            <img
              src={plant?.imgUrl}
              alt=""
              style={{ maxWidth: "-webkit-fill-available" }}
            />
            {/* </AspectRatio> */}
          </Item>
        </Grid>
        <Grid item xs={12} md={6}>
          <Item>
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
                {plant?.location}
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
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item>
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
                    <ListItemText primary={note.action} secondary={note.date} />
                    <ListItemText secondary={note.note} />
                  </ListItem>
                  <Divider component="li" />
                </>
              ))}
            </List>
            <Button>Add</Button>
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item>
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
          </Item>
        </Grid>
      </Grid>
    </Container>
  );
}

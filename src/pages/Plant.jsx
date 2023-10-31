import React from "react";
import { Container, Grid } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";

import EditPlantMenu from "../componets/plant/EditPlantMenu/EditPlantMenu";
import PlantNotes from "../componets/plant/PlantNote/PlantNotes";

import { PageItem } from "../componets/shared/PageItem";

import ImageSection from "../componets/plant/ImageSection";

export default function PlantPage() {
  const { plants, locations } = useAuth();
  let { plantUid } = useParams();

  const plant = plants?.find((plant) => plant.uid === plantUid);

  const plantLocation = locations?.find(
    (location) => location?.uid === plant?.location
  );

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
            <PlantNotes notes={plant?.notes} />
          </PageItem>
        </Grid>
        <Grid item xs={12}>
          <PageItem>
            <h2>Images</h2>
            <ImageSection plant={plant} />
          </PageItem>
        </Grid>
      </Grid>
    </Container>
  );
}

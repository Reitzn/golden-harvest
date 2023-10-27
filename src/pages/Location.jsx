/* eslint-disable no-unused-vars */
import React from "react";
import TempGraph from "../componets/location/TempGraph";
import EnvironmentGraph from "../componets/location/EnvironmentGraph";
import StaticEnvironmentGraph from "../componets/location/StaticEnvironmentGraph";

import { Container, Grid } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import PlantTable from "../componets/plants/PlantTable";

import EditLocationMenu from "../componets/location/EditLocationMenu/EditLocationMenu";
import { PageItem } from "../componets/shared/PageItem";

export default function TraysPage() {
  const { plants, locations } = useAuth();
  let { locationUid } = useParams();

  // TO-DO: Current location ot updating after updating data
  const location = locations?.find((location) => location.uid === locationUid);

  const plantsAtLocation = plants?.filter(
    (plant) => plant.location === locationUid
  );

  return (
    <Container>
      <Grid container direction="row" alignItems="center">
        <Grid container item xs={10} justifyContent="flex-start">
          <h1>{location?.name}</h1>
        </Grid>
        <Grid container item xs={2} justifyContent="flex-end">
          <EditLocationMenu />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <PageItem>
            <img
              src={location?.imgUrl}
              alt=""
              style={{ maxWidth: "-webkit-fill-available", maxHeight: "250px" }}
            />
          </PageItem>
        </Grid>
        <Grid item xs={12} md={6}>
          <PageItem>
            <h2>Location Data</h2>
            <p>About: {location?.about}</p>
          </PageItem>
        </Grid>
        <Grid item xs={12}>
          <PageItem>
            <StaticEnvironmentGraph />
          </PageItem>
        </Grid>
        <Grid item xs={12}>
          <PageItem>
            <h2>Plants</h2>
            <PlantTable plants={plantsAtLocation} />
          </PageItem>
        </Grid>
      </Grid>

      {/* <TempGraph /> */}
      {/* <EnvironmentGraph /> */}
    </Container>
  );
}

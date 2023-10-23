import React from "react";
import TempGraph from "../componets/location/TempGraph";

import { Container, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import PlantTable from "../componets/plants/PlantTable";
import { Box } from "@mui/material";

import DeleteLocationButton from "../componets/location/DeleteLocationButton";
import EditLocationButton from "../componets/location/EditLocationButton";

export default function TraysPage() {
  const { plants, locations } = useAuth();
  let { locationUid } = useParams();

  // TO-DO: Current location ot updating after updating data 
  const location = locations?.find((location) => location.uid === locationUid);

  const plantsAtLocation = plants.filter(
    (plant) => plant.location === locationUid
  );

  console.log(location);

  // Defult code from MUI for grid examples.
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <Container>
      <h1>{location?.name}</h1>
      <Box m={3} display="flex" justifyContent="flex-end" alignItems="flex-end">
        <EditLocationButton locationUid={locationUid} />
        <DeleteLocationButton locationUid={locationUid} />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Item>
            <img
              src="https://placehold.jp/200x200.png"
              alt=""
              style={{ maxWidth: "-webkit-fill-available" }}
            />
          </Item>
        </Grid>
        <Grid item xs={12} md={6}>
          <Item>
            <h2>Location Data</h2>
            <p>About: {location?.about}</p>
            <p>Size: 2x4</p>
            <p>Lights: 2 x 150 MarsHydro</p>
          </Item>
        </Grid>
      </Grid>
      <Grid container paddingTop="20px" spacing={2}>
        <Grid item xs={12}>
          <Item>
            <TempGraph />
          </Item>
        </Grid>
      </Grid>
      <Grid container paddingTop="20px" spacing={2}>
        <Grid item xs={12}>
          <Item>
            <h2>Plants</h2>
            <PlantTable plants={plantsAtLocation} />
          </Item>
        </Grid>
      </Grid>
    </Container>
  );
}

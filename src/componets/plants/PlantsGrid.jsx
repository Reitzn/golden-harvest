import React from "react";

import Grid from "@mui/material/Grid";
import { useAuth } from "../../context/AuthContext";
import PlantCard from "./PlantCard";

export default function PlantsGrid(props) {
  const { plants } = props;
  const { user } = useAuth();

  return (
    <>
      <Grid container alignItems="center" justifyContent="center" spacing={3}>
        {plants?.map((plant) => (
          <Grid
            key={plant.uid}
            align="center"
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
          >
            <PlantCard {...plant} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

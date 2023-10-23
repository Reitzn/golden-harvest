import React from "react";

import Grid from "@mui/material/Grid";
import LocationsCard from "./LocationCard";
import { useAuth } from "../../../context/AuthContext";

export default function LocationsGrid() {
  const { locations } = useAuth();

  return (
    <>
      <Grid container alignItems="center" justifyContent="center" spacing={3}>
        {locations?.map((setting) => (
          <Grid
            key={setting.uid}
            align="center"
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
          >
            <LocationsCard {...setting} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

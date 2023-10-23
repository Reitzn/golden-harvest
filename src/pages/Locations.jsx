import React from "react";

import AddLocationButton from "../componets/locations/AddLocationButton";
import LocationsGrid from "../componets/locations/locations-grid/LocationsGrid";
import { Box, Container } from "@mui/material";

export default function LocationsPage() {
  return (
    <>
      <Container>
        <h1>Locations</h1>
        <Box
          m={3}
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <AddLocationButton />
        </Box>
        <LocationsGrid />
      </Container>
    </>
  );
}

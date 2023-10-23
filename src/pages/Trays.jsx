import React from "react";
import TrayCard from "../componets/trays/TrayCard";
import Box from "@mui/material/Box";

import AddTrayButton from "../componets/trays/AddTrayButton";

export default function TraysPage() {
  return (
    <>
      <h1>Trays</h1>

      <Box m={3} display="flex" justifyContent="flex-end" alignItems="flex-end">
        <AddTrayButton />
      </Box>

      <TrayCard />
    </>
  );
}

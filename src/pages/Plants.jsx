import React, { useState } from "react";
import PlantsGrid from "../componets/plants/PlantsGrid";
import PlantTable from "../componets/plants/PlantTable";
import Box from "@mui/material/Box";
import { useAuth } from "../context/AuthContext";
import { Container, Switch, FormGroup, FormControlLabel } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AddPlantButton from "../componets/plants/AddPlantButton";

export default function PlantsPage() {
  const { user, plants } = useAuth();
  const [checked, setChecked] = useState(false);

  const [location, setLocation] = useState("");

  const handleChange = (event) => {
    setLocation(event.target.value);
    console.log(event.target.value);
    // setPlants(
    //   user?.plants?.filter((plant) => plant.locationUid === event.target.value)
    // );
  };

  const switchHandler = (event) => {
    setChecked(event.target.checked);
  };

  const label = { inputProps: { "aria-label": "Switch demo" } };

  return (
    <>
      <Container>
        <h1>Plants</h1>
        <Box
          m={3}
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <AddPlantButton />
        </Box>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="location-select-label">Location</InputLabel>
            <Select
              labelId="location-select-label"
              id="location-select"
              value={location}
              label="Location"
              onChange={handleChange}
            >
              {user?.locations?.map((location) => (
                <MenuItem value={location.uid}>{location.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch {...label} checked={checked} onChange={switchHandler} />
            }
            label="Table"
          />
        </FormGroup>
        {checked ? (
          <PlantsGrid plants={plants} />
        ) : (
          <PlantTable plants={plants} />
        )}
      </Container>
    </>
  );
}

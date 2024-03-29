// TO-DO: Get location to defualt with current selected location

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { useAuth } from "../../../context/AuthContext";

import { LoadingButton } from "@mui/lab";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useParams } from "react-router-dom";

export default function EditPlantModal(props) {
  const [isLoading, setIsLoading] = useState(false);
  const { isModalOpen, setIsModalOpen } = props;

  const { plantUid } = useParams();
  const { plants, updatePlant, locations } = useAuth();

  const currentPlant = plants?.filter((plant) => {
    return plant.uid === plantUid;
  })[0];

  const [selectedLocation, setSelectedLocation] = useState("");

  const handleChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleClose = () => setIsModalOpen(false);

  const handleSubmit = (event) => {
    setIsLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get("commonName"),
      scientificName: data.get("scientificName"),
    });
    updatePlant(
      plantUid,
      data.get("commonName"),
      data.get("scientificName"),
      selectedLocation
    ).then(() => {
      setIsLoading(false);
      handleClose();
    });
  };

  // Style for modal, mostly from MUI
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 400,
    bgcolor: "background.paper",
    border: "1px solid #000",
    borderRadius: "8px",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            gutterBottom
          >
            Edit Plant
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="commonName"
                  name="commonName"
                  label="Common Name"
                  variant="outlined"
                  defaultValue={currentPlant?.name}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="scientificName"
                  name="scientificName"
                  label="Scientific Name"
                  variant="outlined"
                  defaultValue={currentPlant?.scientificName}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl style={{width: "100%"}}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Location
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={selectedLocation}
                    label="Location"
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {locations?.map((location) => {
                      return (
                        <MenuItem value={location?.uid}>
                          {location?.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <FormHelperText>With label + helper text</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isLoading}
                  color="success"
                  size="large"
                  fullWidth
                >
                  Update
                </LoadingButton>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

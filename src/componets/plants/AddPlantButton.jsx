import React, { useState } from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { LoadingButton } from "@mui/lab";
import { useAuth } from "../../context/AuthContext";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function AddPlantButton() {
  // Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setScientificNameError(false);
    setScientificNameErrorText("");
    setCommonNameError(false);
    setCommonNameErrorText("");
  };

  // Form
  const [isLoading, setIsLoading] = useState(false);
  const [scientificNameError, setScientificNameError] = useState(false);
  const [scientificNameErrorText, setScientificNameErrorText] = useState("");
  const [commonNameError, setCommonNameError] = useState(false);
  const [commonNameErrorText, setCommonNameErrorText] = useState("");

  const { addPlant, locations } = useAuth();

  const [selectedLocation, setSelectedLocation] = React.useState("");

  const handleChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  // Find a better way to do this and extract to its own file to use in all form modals.
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
    minWidth: {
      xs: "95vw",
      sm: null,
    },
  };

  const handleSubmit = (event) => {
    console.log("submit");
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const scientificName = data.get("scientificName");
    const commonName = data.get("commonName");

    console.log({
      scientificName: scientificName,
      commonName: commonName,
    });

    // Get this to go way after typing?!?!
    if (!scientificName) {
      setScientificNameError(true);
      setScientificNameErrorText("Scientific Name is required");
    } else {
      setScientificNameError(false);
    }
    if (!commonName) {
      setCommonNameError(true);
      setCommonNameErrorText("Common Name is required");
    } else {
      setCommonNameError(false);
    }
    if (!scientificName || !commonName) {
      return;
    }

    setIsLoading(true);
    addPlant(commonName, scientificName, selectedLocation).then((plant) => {
      setIsLoading(false);
      handleClose();
      // navigate("/plants/" + plant.id);
    });
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="contained"
        color="success"
        endIcon={<AddIcon />}
      >
        Add Plant
      </Button>
      <Modal
        open={open}
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
            Add A Plant
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="commonName"
                  name="commonName"
                  label="Common Name"
                  variant="outlined"
                  helperText={commonNameErrorText}
                  error={commonNameError}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="scientificName"
                  name="scientificName"
                  label="Scientific Name"
                  variant="outlined"
                  helperText={scientificNameErrorText}
                  error={scientificNameError}
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
                      console.log(location.name);
                      return (
                        <MenuItem value={location.uid}>
                          {location.name}
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
                  Create
                </LoadingButton>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

// ChatGPT has said to use memo to prevent re-renders, look into this more
// export default React.memo(function AddPlantButton() { ... });

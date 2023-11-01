import React from "react";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import IconButton from "@mui/material/IconButton";
import { Box } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import ImageListItemBar from '@mui/material/ImageListItemBar';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DeleteIcon from "@mui/icons-material/Delete";

export default function ImageSection(props) {
    const { addPlantImages } = useAuth();
    let { plantUid } = useParams();

    const{ plant } = props;

    // filter plants based on location to get urls 

    const handleImageChange = (event) => {
        console.log("image", event.target.files);
        addPlantImages(plantUid, event.target.files[0]);
    }

  return (
    <>
      <Box m={3} display="flex" justifyContent="flex-end" alignItems="flex-end">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <input hidden accept="image/*" type="file" onChange={handleImageChange} />
          <PhotoCamera />
        </IconButton>
      </Box>
      <ImageList cols={4}>
        {plant?.images?.map((item) => (
          <ImageListItem key={item.imgUrl}>
            <img
              srcSet={item.imgUrl}
              src={item.imgUrl}
              alt={"test"}
              loading="lazy"
            />
            <ImageListItemBar
              sx={{
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                  'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
              }}
              title="Test Title"
              position="top"
              actionIcon={
                <IconButton
                  sx={{ color: 'white' }}
                  aria-label={`star ${item.title}`}
                >
                  <DeleteIcon />
                </IconButton>
              }
              actionPosition="right"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
}

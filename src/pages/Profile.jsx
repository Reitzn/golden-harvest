/* eslint-disable no-unused-vars */
/* eslint-disable default-case */
import React, { useState } from "react";
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import ProfileImage from "../componets/profile/ProfileImage";
import { styled } from "@mui/material/styles";
import { Box, Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useAuth } from "../context/AuthContext";
import { PageItem } from "../componets/shared/PageItem";
import EditProfileButton from "../componets/profile/EditProfileButton";

export default function ProfilePage() {
  const { user } = useAuth();
  const storage = getStorage();
  const auth = getAuth();
  console.log(auth);
  const [profileImage, setProfileImage] = useState("");

  // Handles input change event and updates state
  function handleChange(event) {
    const storageRef = ref(storage, "images/profile/" + auth?.currentUser?.uid);

    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, event.target.files[0]).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
  }

  const pathReference = ref(
    storage,
    "/images/profile/" + auth?.currentUser?.uid
  );

  // Crop the img for good profile image
  // https://foliotek.github.io/Croppie/

  // Get the download URL
  getDownloadURL(pathReference)
    .then((url) => {
      // Insert url into an <img> tag to "download"
      console.log(url);
      setProfileImage(url);
    })
    .catch((error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case "storage/object-not-found":
          // File doesn't exist
          break;
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          break;
        case "storage/canceled":
          // User canceled the upload
          break;

        // ...

        case "storage/unknown":
          // Unknown error occurred, inspect the server response
          break;
      }
    });

  return (
    <>
      <Container>
        <h1>Profile</h1>
        <Box
          m={3}
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <EditProfileButton />
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <ProfileImage />
          </Grid>
          <Grid item xs={12} md={6}>
            <PageItem>
              <h2>About</h2>
              <Grid container spacing={2}>
                <Grid item xs={6} md={3}>
                  <b>Name:</b>
                </Grid>
                <Grid item xs={6} md={3}>
                  {user?.firstName} {user?.lastName}
                </Grid>
              </Grid>
            </PageItem>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

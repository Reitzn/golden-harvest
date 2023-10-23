/* eslint-disable no-unused-vars */
import React from "react";
import Croppie from "croppie";
import { Avatar, Button } from "@mui/material";
import { addProfileImage } from "../../util/FirebaseUtil";

import "croppie/croppie.css";

export function CropAvatar() {
  const [image, setImage] = React.useState(null);
  const [blob, setBlob] = React.useState(null);
  const [croppie, setCroppie] = React.useState(null);

  const handleImage = (event) => {
    console.log("image", event.target.files);
    console.log("image", event.target.files[0]);
    const image = event.target.files[0];
    setImage(image);
    const el = document.getElementById("image-croppie");
    const reader = new FileReader();
    reader.readAsDataURL(image);
    if (el) {
      console.log("EL", el);
      const croppieInstance = new Croppie(el, {
        enableExif: true,
        viewport: {
          height: 250,
          width: 250,
          type: "circle",
        },
        boundary: {
          height: 280,
          width: 400,
        },
      });
      reader.onload = () => {
        croppieInstance.bind({ url: reader.result });
      };
      setCroppie(croppieInstance);
    }
  };

  const handleSubmit = (event) => {
    console.log("sncscbscscscsc");
    event.preventDefault();
    if (croppie !== null) {
      croppie
        .result({
          type: "blob",
          size: {
            width: 150,
            height: 150,
          },
        })
        .then((blob) => {
          addProfileImage(image, blob);
          setImage(null);
        });
    }
  };

  return (
    <>
      <div id="image-croppie" />
      {!image ? (
        <>
          <Avatar
            alt="Remy Sharp"
            src="https://firebasestorage.googleapis.com/v0/b/golden-harvest-dev.appspot.com/o/images%2Fprofile%2FMNZ7KUZRCNU1mTDYoEgfW75Vggz1?alt=media&token=fd8c93c5-7042-4c44-8569-b583aa3ea63a"
            sx={{ width: 250, height: 250 }}
          />
          <Button component="label">
            Update Profile Image
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={handleImage}
            />
          </Button>
        </>
      ) : (
        <Button variant="contained" component="label" onClick={handleSubmit}>
          Ok
        </Button>
      )}
      <img src={blob} alt="result" />
    </>
  );
}

export default CropAvatar;

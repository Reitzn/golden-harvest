import {
  doc,
  getDocs,
  addDoc,
  updateDoc,
  collection,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase-config";
import { auth } from "../firebase-config";
import { getStorage, ref, uploadBytes } from "firebase/storage";

// --------------------------------------------------------------
// ----------------------- User Services ------------------------
// --------------------------------------------------------------

// Get User
export const getUserService = async () => {
  console.log("Getting suer data");
};

// Add Profile Image
export const addProfileImage = async (image, croppedImage) => {
  console.log("Adding Profile Image");
  const storage = getStorage();

  const profileImageRef = ref(
    storage,
    "images/profile/" + auth?.currentUser?.uid
  );
  const croppedProfileImageRef = ref(
    storage,
    "images/avatar/" + auth?.currentUser?.uid
  );

  // 'file' comes from the Blob or File API
  console.log(croppedImage);
  uploadBytes(profileImageRef, image).then((snapshot) => {
    console.log("Uploaded a profile iamge!");
  });
  uploadBytes(croppedProfileImageRef, croppedImage).then((snapshot) => {
    console.log("Uploaded a avitar image!");
  });
};

// --------------------------------------------------------------
// ---------------------- Plants Services -----------------------
// --------------------------------------------------------------

// Get Plants
export const getPlantsService = async () => {
  const querySnapshot = await getDocs(
    collection(db, "users", auth?.currentUser?.uid, "plants")
  );
  let data = [];
  querySnapshot.forEach((doc) => {
    data.push({ uid: doc.id, ...doc.data() });
  });
  return data;
};

// Add Plant
export const addPlantService = async (name, scientificName, location) => {
  console.log("Adding a plant");
  const newPlant = {
    name,
    scientificName,
    location,
    imgUrl: "https://placehold.jp/200x200.png",
  };
  const plantsRef = collection(db, "users", auth?.currentUser?.uid, "plants");

  return await addDoc(plantsRef, newPlant);
};

// Update Plant 
export const updatePlantService = async (plantUid, name, scientificName, selectedLocation) => {
  const newPlantData = {
    name, 
    scientificName,
    location: selectedLocation,
    imgUrl: "https://placehold.jp/200x200.png",
  }

  const plantsRef = doc(
    collection(db, "users", auth?.currentUser?.uid, "plants"),
    plantUid
  );
  return await updateDoc(plantsRef, newPlantData)
}

// Delete Plant
export const deletePlantService = async (plantUid) => {
  const plantsRef = doc(
    collection(db, "users", auth?.currentUser?.uid, "plants"),
    plantUid
  );
  return await deleteDoc(plantsRef);
};

// --------------------------------------------------------------
// --------------------- Locations Services ---------------------
// --------------------------------------------------------------

//Get Locations
export const getLocationService = async () => {
  const querySnapshot = await getDocs(
    collection(db, "users", auth?.currentUser?.uid, "locations")
  );
  let data = [];
  querySnapshot.forEach((doc) => {
    data.push({ uid: doc.id, ...doc.data() });
  });
  return data;
};

// Add Location
export const addLocationService = async (locationName, locationAbout) => {
  console.log("Adding a location");
  const newLocation = {
    name: locationName,
    about: locationAbout,
    imgUrl: "https://placehold.jp/200x200.png",
  };
  const locationsRef = collection(
    db,
    "users",
    auth?.currentUser?.uid,
    "locations"
  );

  return await addDoc(locationsRef, newLocation);
};

// Update Location
export const updateLocationService = async (
  locationUid,
  locationName,
  locationAbout
) => {

  const newLocationData = {
    name: locationName,
    about: locationAbout,
    imgUrl: "https://placehold.jp/200x200.png",
  };

  const plantsRef = doc(
    collection(db, "users", auth?.currentUser?.uid, "locations"),
    locationUid
  );
  return await updateDoc(plantsRef, newLocationData)
};

// Delete Location
export const deleteLocationService = async (locationUid) => {
  const plantsRef = doc(
    collection(db, "users", auth?.currentUser?.uid, "locations"),
    locationUid
  );
  return await deleteDoc(plantsRef);
};

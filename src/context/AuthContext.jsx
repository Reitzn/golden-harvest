/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import {
  getUserService,
  updateUserService,
  getPlantsService,
  addPlantService,
  updatePlantService,
  deletePlantService,
  getLocationService,
  addLocationService,
  updateLocationService,
  deleteLocationService,
  addPlantNoteService,
  deletePlantNoteService,
  addPlantImagesService,
} from "../util/FirebaseUtil";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [locations, setLocations] = useState(null);
  const [plants, setPlants] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Need to put onAuthStateChanged in a useEffect and unsubscribe or else it
  // calls this 14 times.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        populateContext();
      } else {
        setIsLoading(false);
        navigate("/");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const populateContext = async () => {
    setLocations(await getLocationService());
    setPlants(await getPlantsService());
    setUser(await getUserService());
    setIsLoading(false);
  };

  // -------------------- User ---------------------

  const updateUser = async (firstName, lastName) => {
    updateUserService(firstName, lastName).then(() => {
      const newUserData = {
        firstName,
        lastName,
      };
      setUser(newUserData);
    });
  };

  // ------------------ Locations ------------------

  const addLocation = async (locationNameString, locationAboutSting) => {
    return addLocationService(locationNameString, locationAboutSting).then(
      (docRef) => {
        const newLocation = {
          uid: docRef.id,
          name: locationNameString,
          about: locationAboutSting,
          imgUrl: "https://placehold.jp/200x200.png",
        };
        setLocations((oldArray) => [...oldArray, newLocation]);
      }
    );
  };

  const updateLocation = async (
    locationUid,
    locationNameString,
    locationAboutSting
  ) => {
    return updateLocationService(
      locationUid,
      locationNameString,
      locationAboutSting
    ).then(() => {
      const newLocationData = {
        uid: locationUid,
        name: locationNameString,
        about: locationAboutSting,
        imgUrl: "https://placehold.jp/200x200.png",
      };
      const locationIndex = locations.findIndex(
        (location) => location.uid === locationUid
      );
      const updateLocations = [...locations];
      updateLocations[locationIndex] = newLocationData;
      setLocations(updateLocations);
    });
  };

  const deleteLocation = async (locationUid) => {
    return deleteLocationService(locationUid).then(() => {
      setLocations(
        locations?.filter((location) => {
          return location.uid !== locationUid;
        })
      );
    });
  };

  // ------------------- Plants --------------------

  const addPlant = async (commonName, scientificName, selectedLocation) => {
    return addPlantService(commonName, scientificName, selectedLocation).then(
      (docRef) => {
        const newPlant = {
          uid: docRef.id,
          name: commonName,
          scientificName: scientificName,
          location: selectedLocation,
          notes: [],
          images: [],
          imgUrl: "https://placehold.jp/200x200.png",
        };
        setPlants((oldArray) => [...oldArray, newPlant]);
      }
    );
  };

  const updatePlant = async (
    plantUid,
    commonName,
    scientificName,
    selectedLocation
  ) => {
    updatePlantService(
      plantUid,
      commonName,
      scientificName,
      selectedLocation
    ).then(() => {
      const newPlantData = {
        uid: plantUid,
        name: commonName,
        scientificName: scientificName,
        location: selectedLocation,
      };

      const updatedPlants = plants.map((plant) =>
        plant.uid === plantUid ? { ...plant, ...newPlantData } : plant
      );

      setPlants(updatedPlants);
    });
  };

  const deletePlant = async (plantUid) => {
    return deletePlantService(plantUid).then(() => {
      setPlants(
        plants?.filter((plant) => {
          return plant.uid !== plantUid;
        })
      );
    });
  };

  // Plant notes
  const addPlantNote = async (plantUid, date, action, note) => {
    return addPlantNoteService(plantUid, date, action, note).then(() => {
      const newPlantNoteData = {
        date, action, note
      }
      const locationIndex = plants.findIndex((plant => plant.uid === plantUid));
      const updatedPlants = [...plants];
      updatedPlants[locationIndex].notes.push(newPlantNoteData)
      setPlants(updatedPlants);
    });
  };

  //TO-DO: Set and use a plant noat uid instead of looking at the notes text. 
  const deletePlantNote = async (plantUid, date, action, note) => {
    deletePlantNoteService(plantUid, date, action, note).then(() => {
      const locationIndex = plants.findIndex((plant => plant.uid === plantUid));
      const noteLocationIndex = plants[locationIndex].notes.findIndex((thisNote => thisNote.note === note));
      const updatedPlants = [...plants];
      updatedPlants[locationIndex].notes.splice(noteLocationIndex, 1)
      setPlants(updatedPlants);
    })
  }

  // Plant Images
  const addPlantImages = async (plantUid, file) => {
    addPlantImagesService(plantUid, file).then((imgUrl) => {
      const newPlantImgData = {
        imgUrl,
      }
      const locationIndex = plants.findIndex((plant => plant.uid === plantUid));
      const updatedPlants = [...plants];
      updatedPlants[locationIndex].images.push(newPlantImgData)
      setPlants(updatedPlants);
    })
  }

  const value = useMemo(
    () => ({
      user,
      locations,
      plants,
      updateUser,
      addPlant,
      updatePlant,
      deletePlant,
      addLocation,
      updateLocation,
      deleteLocation,
      addPlantNote,
      deletePlantNote,
      addPlantImages,
      isLoading,
    }),
    [user, locations, plants]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

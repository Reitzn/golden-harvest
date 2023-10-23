/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import data from "./mockUserData";
import { auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import {
  getPlantsService,
  addPlantService,
  updatePlantService,
  deletePlantService,
  getLocationService,
  addLocationService,
  updateLocationService,
  deleteLocationService,
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
        login();
      } else {
        setIsLoading(false);
        navigate("/");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const login = async () => {
    setLocations(await getLocationService());
    setPlants(await getPlantsService());
    setUser(data);
    setIsLoading(false);
    // navigate("/dashboard");
  };

  // -------------------- User ---------------------

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
        const locationIndex = locations.findIndex((location => location.uid === locationUid));
        const updateLocations = [...locations];
        updateLocations[locationIndex] = newLocationData;
        setLocations(updateLocations);

    });
  };

  const deleteLocation = async (locationUid) => {
    return deleteLocationService(locationUid).then(() => {
      setLocations(
        locations.filter((location) => {
          return location.uid !== locationUid;
        })
      );
    });
  };

  // ------------------- Plants --------------------

  const addPlant = async (commonName, scientificName, selectedLocation) => {
    return addPlantService(commonName, scientificName, selectedLocation).then((docRef) => {
      const newPlant = {
        uid: docRef.id,
        name: commonName,
        scientificName: scientificName,
        location: selectedLocation,
        imgUrl: "https://placehold.jp/200x200.png",
      };
      setPlants((oldArray) => [...oldArray, newPlant]);
    });
  };

  const updatePlant = async (plantUid, commonName, scientificName, selectedLocation) => {
    updatePlantService(plantUid, commonName, scientificName, selectedLocation).then(() => {
      const newPlantData = {
        uid: plantUid,
        name: commonName,
        scientificName: scientificName,
        location: selectedLocation,
        imgUrl: "https://placehold.jp/200x200.png",
      };
        const locationIndex = plants.findIndex((plant => plant.uid === plantUid));
        const updatePlants = [...plants];
        updatePlants[locationIndex] = newPlantData;
        setPlants(updatePlants);
    })
  }

  const deletePlant = async (plantUid) => {
    return deletePlantService(plantUid).then(() => {
      setPlants(
        plants.filter((plant) => {
          return plant.uid !== plantUid;
        })
      );
    });
  };

  const value = useMemo(
    () => ({
      user,
      locations,
      plants,
      addPlant,
      updatePlant,
      deletePlant,
      addLocation,
      updateLocation,
      deleteLocation,
      isLoading,
    }),
    [user, locations, plants]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

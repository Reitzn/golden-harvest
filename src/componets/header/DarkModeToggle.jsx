import { useContext } from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import IconButton from "@mui/material/IconButton";
import { ColorModeContext } from "../../context/ColorModeContext";

export default function DarkModeToggle() {
  const { mode, togglColorMode } = useContext(ColorModeContext);

  return (
    <>
      {mode === "light" ? (
        <IconButton
          onClick={() => togglColorMode()}
          aria-label="Liight Mode"
          component="label"
        >
          <LightModeIcon />
        </IconButton>
      ) : (
        <IconButton
          onClick={() => togglColorMode()}
          aria-label="Dark Mode"
          component="label"
        >
          <DarkModeIcon />
        </IconButton>
      )}
    </>
  );
}

import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

// Mostly defult code from MUI for grid examples.
export const PageItem = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "100%",
}));

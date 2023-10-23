import { Container, Box } from "@mui/material";
import UniquePlants from "../componets/dashboard/UniquePlants";

export default function DashboardPage() {
  return (
    <>
      <Container>
        <h1>Dashboard</h1>
        <Box
          m={3}
          display="flex"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <h2>Plants</h2>
        </Box>
        <UniquePlants />
      </Container>
    </>
  );
}

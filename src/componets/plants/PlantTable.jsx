import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function createData(uid, plantNumber, variety, scientificName, scovilleUnits) {
  return { uid, plantNumber, variety, scientificName, scovilleUnits };
}

export default function BasicTable(props) {
  const { plants } = props;
  const navigate = useNavigate();

  let test = plants?.map((plant) => {
    return createData(
      plant.uid,
      plant.plantNumber,
      plant.variety,
      plant.scientificName,
      plant.scovilleUnits
    );
  });

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="plant table">
          <TableHead>
            <TableRow>
              <TableCell>Plant ID</TableCell>
              <TableCell>Variety</TableCell>
              <TableCell>Scientific Name</TableCell>
              <TableCell>Scoville Units</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {test?.map((row) => (
              <TableRow
                key={row.uid}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.plantNumber}
                </TableCell>
                <TableCell>{row.variety}</TableCell>
                <TableCell>{row.scientificName}</TableCell>
                <TableCell>{row.scovilleUnits}</TableCell>
                <TableCell>
                  <Button
                    variant="text"
                    onClick={() => navigate("../plants/" + row.uid)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

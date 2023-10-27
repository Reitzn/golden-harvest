import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAuth } from "../../context/AuthContext";

function createData(name, count) {
  return { name, count };
}

export default function BasicTable(props) {
  const { plants } = useAuth();

  const count = plants?.reduce((tally, plant) => {
    tally[plant.name] = (tally[plant.name] || 0) + 1;
    return tally;
  }, {});

  let plantsData = [];
  if (count) {
    for (const [key, value] of Object.entries(count)) {
      plantsData.push(createData(key, value));
    }
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 200 }} size="small" aria-label="plant table">
          <TableHead>
            <TableRow>
              <TableCell>Variety</TableCell>
              <TableCell>Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {plantsData?.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

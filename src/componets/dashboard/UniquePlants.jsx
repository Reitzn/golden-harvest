import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAuth } from "../../context/AuthContext";

function createData(variety, count) {
  return { variety, count };
}

export default function BasicTable(props) {
  const { user } = useAuth();

  const count = user?.plants?.reduce((tally, plant) => {
    tally[plant.variety] = (tally[plant.variety] || 0) + 1;
    return tally;
  }, {});

  let plants = [];
  if (count) {
    for (const [key, value] of Object.entries(count)) {
      plants.push(createData(key, value));
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
            {plants?.map((row) => (
              <TableRow
                key={row.variety}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.variety}
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

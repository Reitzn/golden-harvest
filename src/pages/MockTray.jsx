import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import OutlinedCard from "../componets/tray/MediaCard";

export default function MockTray() {
  // Leaving the Item from MUI documentation here so I can see the boarders, it's nice for
  // prototyping and not knowing how some of this stuff works.
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
  }));

  return (
    <>
      <h1>Tray 1</h1>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Item>
              <img
                src="https://placehold.jp/300x300.png"
                alt="Placeholder"
                width="300"
                height="300"
              />
            </Item>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Item>
              <h2>About</h2>
              <p>Location: </p>
              <p>Location: </p>
              <p>Location: </p>
              <p>Location: </p>
              <p>Location: </p>
              <p>Location: </p>
              <p>Location: </p>
            </Item>
          </Grid>
        </Grid>
      </Box>
      <table>
        <tr>
          <th>{null}</th>
          <th>A</th>
          <th>B</th>
          <th>C</th>
          <th>D</th>
          <th>E</th>
        </tr>
        <tr>
          <th>1</th>
          <td>
            <OutlinedCard />
          </td>
          <td>
            <OutlinedCard />
          </td>
          <td>
            <OutlinedCard />
          </td>
          <td>
            <OutlinedCard />
          </td>
          <td>
            <OutlinedCard />
          </td>
        </tr>
        <tr>
          <th>2</th>
          <td>
            <OutlinedCard />
          </td>
          <td>
            <OutlinedCard />
          </td>
          <td>
            <OutlinedCard />
          </td>
          <td>
            <OutlinedCard />
          </td>
          <td>
            <OutlinedCard />
          </td>
        </tr>
        <tr>
          <th>3</th>
          <td>
            <OutlinedCard />
          </td>
          <td>
            <OutlinedCard />
          </td>
          <td>
            <OutlinedCard />
          </td>
          <td>
            <OutlinedCard />
          </td>
          <td>
            <OutlinedCard />
          </td>
        </tr>
        <tr>
          <th>4</th>
          <td>
            <OutlinedCard />
          </td>
          <td>
            <OutlinedCard />
          </td>
          <td>
            <OutlinedCard />
          </td>
          <td>
            <OutlinedCard />
          </td>
          <td>
            <OutlinedCard />
          </td>
        </tr>
      </table>
    </>
  );
}

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";
import { Box, ButtonGroup, Button, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import moment from "moment";
import { useParams } from "react-router-dom";
import { auth } from "../../firebase-config";

export default function EnvironmentGraph() {
  const dateFormatter = (date) => {
    return moment(date).format("MM/DD/YY HH:mm");
  };

  const [temp, setTemp] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [illuminance, setIlluminance] = useState(null);
  const [pressure, setPressure] = useState(null);

  let { locationUid } = useParams();

  // For dynamic chart
  const temperatureYAxisLabel = "Temperature (C)";
  const humidityYAxisLabel = "Humidity";
  const illuminanceYAxisLabel = "Illuminance";
  const pressureYAxisLabel = "Pressure";

  const [current, setCurrent] = useState(null);
  const [dataKey, setDataKey] = useState("temperature");
  const [yAxisLabel, setYAxisLabel] = useState(temperatureYAxisLabel);

  const db = getDatabase();
  const dataRef = ref(db, auth?.currentUser?.uid + "/" + locationUid + "/temperature/history");

  let temperature = null;

    // this useEffect will get called only
  // when component gets mounted first time
  useEffect(() => {
    // here onValue will get initialized once
    // and on db changes its callback will get invoked
    // resulting in changing your state value
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);

      setTemp(
        Object.values(data).map((project) => project)
      );

    });
    return () => {
      // this is cleanup function, will call just on component will unmount
      // you can clear your events listeners or any async calls here
    };
  }, []);
    

  const tooltipLabelStyle = {
    color: "black",
  };

  // Defult code from MUI for grid examples.
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "100%",
  }));

  return (
    temp && (
      <Grid container paddingTop="20px" spacing={2}>
        <Grid item xs={12}>
          <Item>
            <Box
              sx={{
                width: "100%",
                height: 400,
              }}
            >
              <h2>Environmental Conditions</h2>
              <>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    width={500}
                    height={300}
                    data={temp}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 50,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="ts"
                      domain={[temp[0].ts, temp[temp.length - 1].ts]}
                      scale="time"
                      type="number"
                      tickFormatter={dateFormatter}
                    />
                    <YAxis>
                      <Label
                        position="insideLeft"
                        style={{
                          textAnchor: "middle",
                        }}
                        angle={270}
                        value={yAxisLabel}
                      />
                    </YAxis>
                    <Tooltip
                      labelFormatter={dateFormatter}
                      labelStyle={tooltipLabelStyle}
                    />
                    <Line
                      type="monotone"
                      dataKey={dataKey}
                      stroke="#8884d8"
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <Box textAlign="center">
                  <ButtonGroup
                    size="small"
                    variant="contained"
                    aria-label="outlined primary button group"
                  >
                    <Button
                      onClick={() => {
                        setCurrent(temp);
                        setDataKey("temperature");
                        setYAxisLabel(temperatureYAxisLabel);
                      }}
                    >
                      Temp
                    </Button>
                    <Button
                      onClick={() => {
                        setCurrent(humidity);
                        setDataKey("humidity");
                        setYAxisLabel(humidityYAxisLabel);
                      }}
                    >
                      Humidity
                    </Button>
                    <Button
                      onClick={() => {
                        setCurrent(illuminance);
                        setDataKey("illuminance");
                        setYAxisLabel(illuminanceYAxisLabel);
                      }}
                    >
                      Light
                    </Button>
                    <Button
                      onClick={() => {
                        setCurrent(pressure);
                        setDataKey("pressure");
                        setYAxisLabel(pressureYAxisLabel);
                      }}
                    >
                      Pressure
                    </Button>
                  </ButtonGroup>
                </Box>
              </>
            </Box>
          </Item>
        </Grid>
      </Grid>
    )
  );
}

/* eslint-disable react-hooks/exhaustive-deps */
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
import { Box, ButtonGroup, Button } from "@mui/material";
import moment from "moment";


export default function StaticEnvironmentGraph() {
  const dateFormatter = (date) => {
    // return moment(date).unix();
    return moment(date).format("DD/MM/YY HH:mm");
  };

  const [temp, setTemp] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [illuminance, setIlluminance] = useState(null);
  const [pressure, setPressure] = useState(null);

  // For dynamic chart
  const temperatureYAxisLabel = "Temperature (C)";
  const humidityYAxisLabel = "Humidity";
  const illuminanceYAxisLabel = "Illuminance";
  const pressureYAxisLabel = "Pressure";

  const [current, setCurrent] = useState(null);
  const [dataKey, setDataKey] = useState("temperature");
  const [yAxisLabel, setYAxisLabel] = useState(temperatureYAxisLabel);

  const db = getDatabase();
  const starCountRef = ref(db, "MNZ7KUZRCNU1mTDYoEgfW75Vggz1/iN7ncujCvt4osHU6Opey");

  useEffect(() => {
    // here onValue will get initialized once
    // and on db changes its callback will get invoked
    // resulting in changing your state value
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      // Once this gets data on the fly this will not work
      setCurrent(
        Object.values(data.temperature.history).map((project) => project)
      );

      setTemp(
        Object.values(data.temperature.history).map((project) => project)
      );
      setHumidity(
        Object.values(data.humidity.history).map((project) => project)
      );
      setIlluminance(
        Object.values(data.illuminance.history).map((project) => project)
      );
      setPressure(
        Object.values(data.pressure.history).map((project) => project)
      );
    }, {onlyOnce: true});
    return () => {
      // this is cleanup function, will call just on component will unmount
      // you can clear your events listeners or any async calls here
    };
  }, []);

  const tooltipLabelStyle = {
    color: "black",
  };

  return (
    <>
      <h2>Environmental Conditions</h2>
      {current && (
        <>
          <ResponsiveContainer width="100%" height={300} >
            <LineChart
              width={500}
              height={300}
              data={current}
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
                domain={[current[0].ts, current[current.length - 1].ts]}
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
      )}
    </>
  );
}
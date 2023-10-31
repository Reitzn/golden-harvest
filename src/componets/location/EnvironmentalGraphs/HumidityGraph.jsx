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
import { auth } from "../../../firebase-config";

export default function HumidityGraph() {
  const dateFormatter = (date) => {
    return moment(date).format("MM/DD/YY HH:mm");
  };

  const [temperatureState, setTemperatureState] = useState(null);
  const [temp, setTemp] = useState(null);

  const [humidity, setHumidity] = useState(null);
  const [currentHumidity, setCurrentHumidity] = useState(null);


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
  // const dataRef = ref(
  //   db,
  //   auth?.currentUser?.uid + "/" + locationUid + "/temperature/history"
  // );

  // this useEffect will get called only
  // when component gets mounted first time
  useEffect(() => {
    // here onValue will get initialized once
    // and on db changes its callback will get invoked
    // resulting in changing your state value
    if (auth?.currentUser) {
      const dataRef = ref(
        db,
        auth?.currentUser?.uid + "/" + locationUid + "/humidity"
      );
      onValue(dataRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);

        //const newData = Object.values(data).map((project) => project);
        //console.log(newData);

        setCurrentHumidity(data.current);
        setHumidity(Object.values(data.history).map((project) => project));
      });
    }
    return () => {
      // this is cleanup function, will call just on component will unmount
      // you can clear your events listeners or any async calls here
    };
  }, [auth?.currentUser]);

  const tooltipLabelStyle = {
    color: "black",
  };

  return (
    humidity && (
      <>
      <h3>Humidity</h3>
        <p>Current Humidity: {currentHumidity} C</p>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            width={500}
            height={300}
            data={humidity}
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
              domain={[humidity[0].ts, humidity[humidity.length - 1].ts]}
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
              dataKey={"humidity"}
              stroke="#8884d8"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </>
    )
  );
}

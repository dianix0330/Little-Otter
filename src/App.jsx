import React, { useState, useEffect, useMemo } from "react";
import "react-calendar/dist/Calendar.css";

import moment from "moment";
import "./App.css";

import { Chart, DateDisplay, Header, SessionsDistribution } from "./components";

const URL =
  "https://lo-interview.s3.us-west-2.amazonaws.com/health_sessions.json";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState("");
  const [sessions, setSessions] = useState({});

  const dateSessionInfo = (currentDate) => {
    const seesionsList = sessions[currentDate];
    const currentYear = moment(currentDate).format("YYYY");
    const sessionInfo = {
      count: seesionsList?.length ?? 0,
      average_length: 0,
      average_distance: 0,
      average_age: 0,
    };
    seesionsList?.forEach((session) => {
      sessionInfo.average_length += session.sessionduration;
      sessionInfo.average_distance += session.distance;
      sessionInfo.average_age += session["birth year"] - currentYear;
    });
    sessionInfo.average_length = sessionInfo.average_length / sessionInfo.count;
    sessionInfo.average_distance =
      sessionInfo.average_distance / sessionInfo.count;
    sessionInfo.average_age =
      (currentYear - sessionInfo.average_age) / sessionInfo.count;
    return sessionInfo;
  };

  const sessionDates = useMemo(() => Object.keys(sessions), [sessions]);

  const currentSessions = useMemo(
    () => sessions[currentDate],
    [sessions, currentDate]
  );

  const chartData = useMemo(() => Object.entries(sessions).reduce(
      (result, [key, _]) => {
        const sessionInfo = dateSessionInfo(key);
        result.count.push(sessionInfo.count);
        result.average_age.push(sessionInfo.average_age);
        result.average_distance.push(sessionInfo.average_distance);
        result.average_length.push(sessionInfo.average_length);
        return result;
      },
      {
        count: [],
        average_age: [],
        average_distance: [],
        average_length: [],
      }
    ), [sessions]);

  const getSessionInfo = (data) => {
    const result = data.reduce((acc, session) => {
      const start_time = moment(session.start_time).format("YYYY-MM-DD");
      acc[start_time] = acc[start_time] || [];
      acc[start_time].push({
        ...session,
        start_time: start_time,
      });
      return acc;
    }, {});
    setCurrentDate(moment(data[0]?.start_time).format("YYYY-MM-DD"))
    setSessions(result);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetch(URL);
      const result = await data.json();
      getSessionInfo(result);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      {loading ? (
        <div className="loading_spinner"></div>
      ) : (
        <div className="main">
          <Header />
          <div className="container">
            <div className="section">
              <DateDisplay
                sessionDates={sessionDates}
                setCurrentDate={(curDate) => setCurrentDate(curDate)}
              />
              <SessionsDistribution sessionsList={currentSessions} />
            </div>
            <div className="section chart-section">
              <Chart sessionForDates={sessionDates} dataInfo={chartData} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React from "react";
import "./index.css";

export default function SessionsDistribution({ sessionsList }) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Provider ID</th>
            <th>Start Time</th>
            <th>Stop Time</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {sessionsList?.map((session, index) => (
            <tr key={index}>
              <td>{session.provider_id}</td>
              <td>{session.start_time}</td>
              <td>{session.stop_time}</td>
              <td>{session.sessionduration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

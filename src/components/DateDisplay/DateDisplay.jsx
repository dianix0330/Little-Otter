import React, { useState } from "react";
import moment from "moment";

import "./index.css";

export default function DateDisplay({ sessionDates, setCurrentDate }) {
  const dates = sessionDates.map((date) => moment(date).format("MM/DD"));
  const [activeIndex, setActiveIndex] = useState(0);

  const handleItemClick = (index) => {
    setActiveIndex(index);
    setCurrentDate(sessionDates[index]);
  };

  return (
    <div className="date__container">
      {dates.map((date, index) => (
        <div
          key={index}
          className={`date__item ${activeIndex === index && "active"}`}
          onClick={() => handleItemClick(index)}
        > 
          {date}
        </div>
      ))}
    </div>
  );
}

import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { EventContext } from "../../context/Context";
import "./EventList.css";
const EventList = () => {
  const { events, get_event_datails, isOnline, isLoading } =
    useContext(EventContext);

  return (
    <div className="container">
      {isOnline ? (
        <>
          <p className="text">You are online</p>
          <button style={{ marginBottom: "4rem" }} onClick={get_event_datails}>
            Load data
          </button>
        </>
      ) : (
        <p className="text">You are offline</p>
      )}

      {isLoading ? (
        <span>.....Loading</span>
      ) : (
        <div className="event_wrapper">
          {events?.map(({ ID, title, date }) => (
            <div className="single_event" key={ID}>
              <Link className="event_name" to={`/${ID}`}>
                <span>{title}</span>
              </Link>
              <span className="date">{date}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventList;

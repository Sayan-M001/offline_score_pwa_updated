import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EventContext } from "../../context/Context";
import Row from "../../components/Row/Row";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Event.css";
const Event = () => {
  const [event, setEvent] = useState(null);
  const [players, setPlayers] = useState([]);
  const { ID } = useParams();
  const { get_event_datails_by_ID, isOnline } = useContext(EventContext);

  useEffect(() => {
    const single_event = get_event_datails_by_ID(ID);
    setEvent(single_event);
    if (single_event?.performance) {
      const performance = single_event.performance;
      setPlayers(Object.entries(performance));
    }
  }, [ID, get_event_datails_by_ID]);

  const handleSubmit = async () => {
    if (isOnline) {
      alert("You are Online! , Please add data from wp-admin");
    } else {
      const updatedPerformance = players.reduce(
        (acc, [playerId, playerData]) => {
          acc[playerId] = { [playerId]: {} };
          const player = playerData[playerId];
          for (const [key, value] of Object.entries(player)) {
            acc[playerId][playerId][key] = value === "" ? "0" : value;
          }
          delete acc[playerId][playerId].player_name;
          return acc;
        },
        {},
      );
      localStorage.setItem(
        "offline_data",
        JSON.stringify({ event_id: ID, updatedPerformance }),
      );
      toast.info("You are Offline, Data Stored Successfully", {
        position: "top-right",
        autoClose: 4000,
      });
    }
  };

  return (
    <div className="container">
      {players?.map(([playerId, playerData]) => (
        <Row
          key={playerId}
          eventId={ID}
          playerId={playerId}
          playerData={playerData}
          setPlayers={setPlayers}
        />
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Event;

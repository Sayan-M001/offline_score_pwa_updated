import React, { useContext } from "react";
import "./Row.css";
import { EventContext } from "../../context/Context";
const Row = ({ eventId, playerId, playerData, setPlayers }) => {
  const { setEvents } = useContext(EventContext);
  const handleInputChange = (playerId, rangeKey, value) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map(([id, data]) =>
        id === playerId
          ? [id, { ...data, [id]: { ...data[id], [rangeKey]: value } }]
          : [id, data],
      ),
    );
    const events = JSON.parse(localStorage.getItem("events")) || [];
    const updatedEvents = events?.map((event) => {
      if (event.ID == eventId) {
        const updatedPerformance = { ...event.performance };
        if (updatedPerformance[playerId]) {
          updatedPerformance[playerId] = {
            ...updatedPerformance[playerId],
            [playerId]: {
              ...updatedPerformance[playerId][playerId],
              [rangeKey]: value,
            },
          };
        }

        return {
          ...event,
          performance: updatedPerformance,
        };
      }
      return event;
    });
    console.log("updatedEvents =>", updatedEvents);
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };
  let rangeCounter = 1;
  return (
    <div className="row" key={playerId}>
      <h4>{playerData[playerId]["player_name"]}</h4>
      <div className="fields_wrapper">
        {Object.entries(playerData[playerId]).map(
          ([rangeKey, rangeValue], idx) => (
            <div className="field" key={rangeKey}>
              {rangeKey !== "position" &&
                rangeKey !== "Target" &&
                rangeKey !== "player_name" &&
                rangeKey !== "number" && (
                  <>
                    <label>Range{rangeCounter++}</label>
                    <input
                      type="text"
                      value={rangeValue}
                      onChange={(e) =>
                        handleInputChange(playerId, rangeKey, e.target.value)
                      }
                    />
                  </>
                )}
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default Row;

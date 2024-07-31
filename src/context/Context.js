import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const initialState = JSON.parse(localStorage.getItem("events")) || [];

export const EventContext = createContext(initialState);

export const Provider = ({ children }) => {
  const [events, setEvents] = useState(initialState);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      const data = JSON.parse(localStorage.getItem("offline_data"));
      if (data) {
        sendDataToServer(data);
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    if (isOnline) {
      handleOnline();
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const sendDataToServer = async (data) => {
    const URL = `https://new.compaksa.co.za/wp-json/sportspress/v2/sp_event/submit_performance_2`;

    try {
      let response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event_id: data.event_id,
          performance: data.updatedPerformance,
        }),
      });

      if (response.ok) {
        toast.success("Scores Uploaded Successfully!", {
          position: "top-right",
          autoClose: 4000,
        });
        localStorage.removeItem("offline_data");
        get_event_datails();
      }
    } catch (error) {
      toast.error("Scores Uploaded Failed!", {
        position: "top-right",
        autoClose: 4000,
      });
      console.log(error?.message);
    }
  };

  const get_event_datails = async () => {
    const URL = `https://new.compaksa.co.za/wp-json/sportspress/v2/sp_event/event_details`;
    setIsLoading(true);
    try {
      let response = await fetch(URL);

      if (response.ok) {
        response = await response.json();
        console.log("response=> ", response);
        setEvents(response);
        localStorage.setItem("events", JSON.stringify(response));
      }
    } catch (error) {
      console.log(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const get_event_datails_by_ID = (ID) => {
    const single_event = events?.find((event) => event["ID"] == ID);
    return single_event;
  };

  return (
    <EventContext.Provider
      value={{
        get_event_datails,
        events,
        get_event_datails_by_ID,
        isOnline,
        isLoading,
        setEvents,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

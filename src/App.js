import { Route, Routes } from "react-router-dom";
import "./App.css";
import EventList from "./pages/EventListPage/EventList";
import Event from "./pages/EventPage/Event";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/:ID" element={<Event />} />
      </Routes>
    </div>
  );
}

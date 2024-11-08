import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import TaskManager from "./TaskManager.tsx";
import CalendarComponent from "./CalendarComponent.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TaskManager />
    <CalendarComponent />
  </StrictMode>
);

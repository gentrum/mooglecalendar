import axios from "axios";
import { useEffect, useState } from "react";
import { Calendar, dayjsLocalizer, Event } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./CalendarComponent.css";

//interface representation of task
interface Task {
  id: number;
  name: string;
  description: string;
  hours: number;
  duedate: string; //must be in YYYY-MM-DD format
}

export const CalendarComponent = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Event | null>(null);
  const eventTask = tasks.find((task) => task.name === selectedTask?.title);
  //need to fetch tasks from db using ap
  const fetchTasks = async () => {
    const response = await axios.get("http://localhost:8000/api/tasks/");
    setTasks(response.data);
  };

  useEffect(() => {
    fetchTasks(); //call on component mount
  }, []);

  //have to remap the task data so it can fit the format for the calendar
  const events = tasks.map((task) => ({
    id: task.id,
    title: task.name,
    start: new Date(task.duedate),
    end: new Date(task.duedate),
    allDay: true,
  }));

  const handleSelectEvent = (e: Event) => {
    setSelectedTask(e);
  };

  const handleDelete = async () => {
    await axios.delete("http://localhost:5173/api/tasks/${eventTask.id}");
    const response = await axios.get("http://localhost:5173/api/tasks/");
    setTasks(response.data); //refresh task list
  };

  return (
    <div>
      <Calendar
        localizer={dayjsLocalizer(dayjs)}
        events={events}
        onSelectEvent={handleSelectEvent}
        style={{ height: 500 }}
        views={["month"]}
        selectable
      />
      <div id={selectedTask ? "isSelectedTask" : "taskNotSelected"}>
        <p id="selectedTaskDetails">
          Name: {eventTask?.name}
          <br />
          Description: {eventTask?.description}
          <br />
          Due: {eventTask?.duedate}
        </p>
        <button id="deleteButton" onClick={handleDelete}>
          Delete Task
        </button>
      </div>
    </div>
  );
};

export default CalendarComponent;

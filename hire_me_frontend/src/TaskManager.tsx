import axios from "axios";
import React, { useEffect, useState } from "react";
import "./TaskManager.css";

interface Task {
  id: number;
  name: string;
  description: string;
  hours: number;
  duedate: string;
  completed: boolean;
}

const TaskManager = () => {
  //set list of tasks
  const [tasks, setTasks] = useState<Task[]>([]);
  //set individual task
  const [task, setTask] = useState<Task>({
    id: -1,
    name: "",
    description: "",
    hours: 0,
    duedate: "1999-01-01", //date object
    completed: false,
  });
  //state representing whether or not we are editing a task
  //either null or editing the number id
  const [editing, setEditing] = useState<number | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      //axios handles HTTP requests, so here we're awaiting the get request
      const response = await axios.get("http://localhost:8000/api/tasks/");
      setTasks(response.data);
    };

    fetchTasks();
    //empty array means effect only runs once after initial render
  }, []);

  //handleSubmit handles updating or creating a task
  //"e" refers to the event by the way
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //only explicit handling of an action works
    if (editing) {
      //awaiting the put request to go through
      await axios.put("http://localhost:8000/api/tasks/${editing}/", {
        name: task.name,
        hours: task.hours,
        duedate: task.duedate,
        description: task.description,
      });
    } else {
      //awaiting the url to send us the post request
      await axios.post("http://localhost:8000/api/tasks/", {
        name: task.name,
        hours: task.hours,
        duedate: task.duedate,
        description: task.description,
      });
    }
    setTask({
      id: -1,
      name: "",
      description: "",
      hours: 0,
      duedate: "1999-01-01",
      completed: false,
    });
    setEditing(null);
    //refresh the task list
    const response = await axios.get("http://localhost:8000/api/tasks/");
    //add tasks to task list
    setTasks(response.data);
  };

  const handleEdit = (task: Task) => {
    setTask(task);
    setEditing(task.id);
  };

  const handleDelete = async (id: number) => {
    await axios.delete("http://localhost:5173/api/tasks/${id}");
    const response = await axios.get("http://localhost:5173/api/tasks/");
    setTasks(response.data); //refresh task list
  };

  return (
    <div>
      <h1>"Hire me" Calendar</h1>
      <form onSubmit={handleSubmit}>
        <input //still dont really get the input field tbh
          type="text" //shows before entering
          placeholder="Name" //this input names the task
          value={task.name}
          onChange={(e) => setTask({ ...task, name: e.target.value })} //... is the spread op
          required //e is an event dont forget
        />
        <textarea //a type of input we are using because it allows multi-line entry
          //and is much more suited to description than <input/>
          placeholder="Description"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          required></textarea>
        <input
          type="number"
          placeholder="Hours Needed"
          value={task.hours || ""}
          onChange={(e) => setTask({ ...task, hours: e.target.valueAsNumber })}
          required
        />
        <input
          type="date"
          placeholder="Date Due (YYYY-MM-DD)"
          value={task.duedate}
          onChange={(e) => setTask({ ...task, duedate: e.target.value })}
        />
        <button type="submit">Submit Task</button>
      </form>
    </div>
  );
};

export default TaskManager;

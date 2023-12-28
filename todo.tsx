"use client";
import { useState } from "react";

type Todo = {
  id: number;
  job: string;
  iscompleted: boolean;
  isFocus: boolean;
};

const Home = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [job, setJob] = useState<string>("");
  const [selectJob, setSelectJob] = useState<string>("all");

  const handleAddJob = () => {
    const newJob = [
      ...todos,
      { id: Date.now(), job: job, iscompleted: false, isFocus: false },
    ];
    setTodos(newJob);
    setJob("");
  };

  const handleDeleteJob = (id: number) => {
    let detelejob = [];
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id !== id) {
        detelejob.push(todos[i]);
      }
    }
    setTodos(detelejob);
    // setTodos(todos.filter((item) => {
    //   return item.id !== id
    // }))
  };

  const handleDone = (id: number) => {
    const jobDone = [...todos];
    for (let i = 0; i < jobDone.length; i++) {
      if (id === jobDone[i].id) {
        jobDone[i] = { ...jobDone[i], iscompleted: true };
      }
    }
    setTodos(jobDone);
    console.log("job done: ", jobDone);
    console.log("todos: ", todos);
  };

  const handleDeteleDoneJob = () => {
    let deteleDoneJob = [];
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].iscompleted === false) {
        deteleDoneJob.push(todos[i]);
      }
    }
    setTodos(deteleDoneJob);
  };

  const handleDeteleNotDone = () => {
    let deteleNotDone = [];
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].iscompleted !== false) {
        deteleNotDone.push(todos[i]);
      }
    }
    setTodos(deteleNotDone);
  };

  const handleUpdateJob = (id: Number) => {
    let newTodos = [...todos];

    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === id) {
        newTodos[i] = { ...newTodos[i], job };
      }
    }
    setTodos(newTodos);
  };

  let showJobs = todos;
  if (selectJob === "done") {
    showJobs = todos.filter((todo) => todo.iscompleted === true);
  } else if (selectJob === "notDone") {
    showJobs = todos.filter((todo) => todo.iscompleted === false);
  }

  return (
    <div>
      <div>
        <h1>TODO LIST VER 2- DO WHAT YOU WANT</h1>
        <input value={job} onChange={(e) => setJob(e.target.value)} />
        <button onClick={handleAddJob}>Add New Job</button>

        <ul>
          {showJobs.map((todo) => (
            <span>
              <li
                key={todo.id}
                style={{
                  textDecoration: todo.iscompleted ? "line-through" : "none",
                }}
              >
                <span
                  onClick={() => {
                    setJob(todo.job);
                  }}
                  style={{ border: todo.isFocus ? "1px solid black" : "none" }}
                >
                  {todo.job}
                </span>
                <button onClick={() => handleDeleteJob(todo.id)}>
                  Detele Job
                </button>
                <button onClick={() => handleDone(todo.id)}>Done</button>
                <button onClick={() => handleUpdateJob(todo.id)}>Update</button>
              </li>
            </span>
          ))}
        </ul>

        <button onClick={handleDeteleDoneJob}>Detele Done Job</button>
        <button onClick={handleDeteleNotDone}>Detele Not Done</button>
        <label htmlFor="job">Choose:</label>
        <select
          value={selectJob}
          onChange={(e) => setSelectJob(e.target.value)}
          name="job"
          id="job"
        >
          <option value="all">All</option>
          <option value="done">Done</option>
          <option value="notDone">Not Done</option>
        </select>
      </div>
    </div>
  );
};

export default Home;

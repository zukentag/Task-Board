import React, { useState } from "react";
import TaskItem from "../components/TaskItem";
import { getFormattedDate } from "../common/commonFunctions";

const ToDoList = () => {
  const [showInput, setShowInput] = useState(false);
  const [inputTask, setInputTask] = useState({
    title: "",
    description: "",
    timestamp: null,
  });
  const [data, setData] = useState({
    pending: [],
    inprogress: [],
    completed: [],
  });

  const handleAddToPending = () => {
    if (inputTask.title) {
      setData((prevData) => ({
        ...prevData,
        pending: [...prevData.pending, inputTask],
      }));
      setInputTask({
        title: "",
        description: "",
        timestamp: null,
      });
    }
    setShowInput(false);
  };

  const moveToIncomplete = (e, index) => {
    e.preventDefault();
    const task = data.pending[index];
    setData((prevData) => {
      const pending = [...prevData.pending];
      pending.splice(index, 1);
      return {
        ...prevData,
        pending,
        inprogress: [...prevData.inprogress, task],
      };
    });
  };

  const moveToCompleted = (e, index) => {
    e.preventDefault();
    let task = data.inprogress[index];
    task.timestamp = getFormattedDate();

    setData((prevData) => {
      const inprogress = [...prevData.inprogress];
      inprogress.splice(index, 1);

      return {
        ...prevData,
        inprogress,
        completed: [...prevData.completed, task],
      };
    });
  };

  return (
    <div className="toDoList">
      <div className="toDoListColumn">
        <div className="toDoListColumnHeading">
          Pending: {data.pending.length}
        </div>

        <div className="toDoListColumnItems">
          {data.pending.length !== 0 &&
            data.pending.map((task, index) => (
              <div key={index}>
                <TaskItem
                  task={task}
                  index={index}
                  handleClick={moveToIncomplete}
                  movebuttonText={"Start"}
                />
              </div>
            ))}
        </div>
        {showInput ? (
          <div className="toDoListColumnActions">
            <input
              type="text"
              className="toDoListColumnActionsInput"
              placeholder="Title*"
              value={inputTask.title}
              onChange={(e) =>
                setInputTask((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
            />
            <textarea
              placeholder="Description"
              rows="4"
              cols="50"
              className="toDoListColumnActionsInput"
              value={inputTask.description}
              onChange={(e) =>
                setInputTask((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
            <div>
              <button
                className="toDoListColumnActionsButton"
                onClick={handleAddToPending}
              >
                ✔
              </button>
              <button
                className="toDoListColumnActionsButton"
                onClick={() => {
                  setShowInput(false);
                  setInputTask({ title: "", description: "", timestamp: null });
                }}
              >
                X
              </button>
            </div>
          </div>
        ) : (
          <button
            style={{ display: "flex", outline: "none", border: "none" }}
            onClick={() => setShowInput(true)}
          >
            Add +
          </button>
        )}
      </div>
      <div className="toDoListColumn">
        <div className="toDoListColumnHeading">
          Inprogress: {data.inprogress.length}
        </div>

        <div className="toDoListColumnItems">
          {data.inprogress.length !== 0 &&
            data.inprogress.map((task, index) => (
              <div key={index}>
                <TaskItem
                  task={task}
                  index={index}
                  handleClick={moveToCompleted}
                  movebuttonText={"Complete"}
                />

                <div className="lineBreak"></div>
              </div>
            ))}
        </div>
      </div>
      <div className="toDoListColumn">
        <div className="toDoListColumnHeading">
          Completed: {data.completed.length}
        </div>
        <div className="toDoListColumnItems">
          {data.completed.length !== 0 &&
            data.completed.map((task, index) => (
              <div key={index}>
                <TaskItem task={task} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ToDoList;

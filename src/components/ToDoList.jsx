import React, { useState } from "react";
import TaskItem from "../components/TaskItem";
import DropArea from "../components/DropArea";
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

  const [activeCard, setActiveCard] = useState({
    table: null,
    index: null,
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

  const onDrop = (status, index) => {
    if (!activeCard.table && activeCard.index === null) return;

    const taskToColumn = status;
    const taskToIndex = index;

    const taskFromColumn = activeCard.table;
    const taskFromIndex = activeCard.index;

    setData((prev) => {
      // Create a shallow copy of the previous state
      const newState = { ...prev };

      // Create deep copies of the columns to ensure immutability
      const fromColumnTasks = [...newState[taskFromColumn]];
      const toColumnTasks = [...newState[taskToColumn]];

      // Extract the task from the source column
      const task = fromColumnTasks[taskFromIndex];

      // Remove the task from the source column
      fromColumnTasks.splice(taskFromIndex, 1);

      // Insert the task into the destination column
      toColumnTasks.splice(taskToIndex, 0, task);

      // Update the state with the new columns
      newState[taskFromColumn] = fromColumnTasks;
      newState[taskToColumn] = toColumnTasks;

      return newState;
    });

    setActiveCard({ table: null, index: null });
  };

  return (
    <div className="toDoList">
      <div className="toDoListColumn">
        <div className="toDoListColumnHeading">
          Pending: {data.pending.length}
        </div>

        <div className="toDoListColumnItems">
          <DropArea onDrop={() => onDrop("pending", 0)} />
          {data.pending.length !== 0 &&
            data.pending.map((task, index) => (
              <div key={index}>
                <TaskItem
                  task={task}
                  index={index}
                  handleClick={moveToIncomplete}
                  movebuttonText={"Start"}
                  table={"pending"}
                  setActiveCard={setActiveCard}
                />
                <DropArea onDrop={() => onDrop("pending", index + 1)} />
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
          <DropArea onDrop={() => onDrop("inprogress", 0)} />
          {data.inprogress.length !== 0 &&
            data.inprogress.map((task, index) => (
              <div key={index}>
                <TaskItem
                  task={task}
                  index={index}
                  handleClick={moveToCompleted}
                  movebuttonText={"Complete"}
                  table={"inprogress"}
                  setActiveCard={setActiveCard}
                />
                <DropArea onDrop={() => onDrop("inprogress", index + 1)} />
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
          <DropArea onDrop={() => onDrop("completed", 0)} />
          {data.completed.length !== 0 &&
            data.completed.map((task, index) => (
              <div key={index}>
                <TaskItem
                  task={task}
                  index={index}
                  setActiveCard={setActiveCard}
                  table={"completed"}
                />
                <DropArea onDrop={() => onDrop("completed", index + 1)} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ToDoList;

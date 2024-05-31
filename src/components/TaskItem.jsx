const TaskItem = ({ task, index, handleClick, movebuttonText = null }) => {
  return (
    <div className="taskItem">
      <div className="taskItemTitle">{task.title}</div>
      {task.description && (
        <div className="taskItemDescription">{task.description}</div>
      )}
      {task.timestamp && (
        <div className="taskItemTimestamp">{task.timestamp}</div>
      )}
      {movebuttonText && (
        <button
          className="taskItemButton"
          onClick={(e) => {
            e.preventDefault();
            handleClick(e, index);
          }}
        >
          {movebuttonText}
        </button>
      )}
    </div>
  );
};

export default TaskItem;

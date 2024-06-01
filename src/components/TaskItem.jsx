const TaskItem = ({
  task,
  index,
  handleClick,
  movebuttonText = null,
  setActiveCard,
  table,
}) => {
  return (
    <div
      className="taskItem"
      draggable
      onDragStart={() =>
        setActiveCard({
          table: table,
          index: index,
        })
      }
      onDragEnd={() => setActiveCard(null)}
    >
      <div className="taskItemTitle">{task?.title}</div>
      {task?.description && (
        <div className="taskItemDescription">{task.description}</div>
      )}
      {task?.timestamp && (
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

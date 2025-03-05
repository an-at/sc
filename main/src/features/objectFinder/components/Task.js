export default function Task({ uncompletedTasks }) {
  if (uncompletedTasks.length === 0) {
    return (
      <>
        <p className="task"> Все задания выполнены</p>
      </>
    );
  }

  const currentTask = uncompletedTasks[0];
  return (
    <>
      <p key={currentTask.index} className="task">
        {" "}
        {currentTask.description}{" "}
      </p>
    </>
  );
}

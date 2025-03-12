export default function Task({ currentTask }) {
  return (
    <div key={currentTask.index} className="task">
      {" "}
      {currentTask.description}{" "}
    </div>
  );
}

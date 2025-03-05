export default function Timer({ time }) {
  const minutes = Math.trunc(time / 60);
  const seconds = time % 60;
  const renderValue =
    time > 0 ? (
      <p className="timer">
        {minutes}:{seconds}
      </p>
    ) : (
      <p className="timer"> Time is out</p>
    );

  return <>{renderValue}</>;
}

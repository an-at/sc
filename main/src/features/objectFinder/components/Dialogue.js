export default function Dialogue({
  clickHandler,
  dialogueHandler,
  dialogueTexts,
}) {
  return (
    <div className="dialogue">
      <span> {dialogueTexts[0]} </span>
      {dialogueTexts.length > 1 ? (
        <button onClick={dialogueHandler}> next dialogue </button>
      ) : (
        <button onClick={clickHandler}> start </button>
      )}
    </div>
  );
}

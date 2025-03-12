export default function Dialogue({
  clickHandler,
  dialogueHandler,
  dialogueTexts,
}) {
  return (
    <div className="dialogue">
      <span> {dialogueTexts[0]} </span>
      {dialogueTexts.length > 1 ? (
        <button onClick={dialogueHandler} className="dialogueButton">
          next dialogue
        </button>
      ) : (
        <button onClick={clickHandler}> start </button>
      )}
    </div>
  );
}

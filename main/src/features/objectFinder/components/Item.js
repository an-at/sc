export default function Item({ name, imgSrc, position, clickHandler }) {
  return (
    <>
      <img
        src={imgSrc}
        style={position}
        className="item"
        id={name}
        onClick={clickHandler}
        alt="item"
      />
    </>
  );
}

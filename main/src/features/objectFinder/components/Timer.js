export default function Item({ name, imgSrc, position, clickHandler }) {
  return (
    <>
      <img
        src={imgSrc}
        style={position}
        className="object"
        id={name}
        onClick={clickHandler}
        alt="Old women img"
      />
    </>
  );
}

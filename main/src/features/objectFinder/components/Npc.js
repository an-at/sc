export default function Npc({ option }) {
  const imgSrc = option
    ? "/img/characters/susie_dialogue_glasses.png"
    : "/img/characters/susie_dialogue.png";

  return (
    <>
      <img src={imgSrc} className="npc" alt="npc" />
    </>
  );
}

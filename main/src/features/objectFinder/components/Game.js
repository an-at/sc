import "../styles/Game.css";
import { useEffect, useRef, useState } from "react";
import { items, tasks, dialogueTexts } from "../../../data/objectFinderData.js";
import Task from "./Task.js";
import Item from "./Item.js";
import Dialogue from "./Dialogue.js";
import Timer from "./Timer.js";
import Npc from "./Npc.js";

/*
Вопросы
*/

export default function Game() {
  // Состояния
  const [state, setState] = useState("readyToGame");
  const [dialogueText, setDialogueText] = useState(dialogueTexts.slice(0));
  const [uncompletedTasks, setUncompletedTasks] = useState(tasks.slice(0));
  const [currentTime, setCurrentTime] = useState(100);

  useEffect(() => {
    if (state === "game") {
      startTimer();
    }
  }, [state]);
  useEffect(() => {
    if (uncompletedTasks.length === 2) {
      setState("game");
    }
    stopGame();
  }, [uncompletedTasks, currentTime]);
  function stopGame() {
    if (uncompletedTasks.length > 0 && currentTime === 0) {
      setState("fail");
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
    if (uncompletedTasks.length === 0 && currentTime > 0) {
      setState("success"); // временно сменил чтобы проверить отображения текста про выполненность заданий
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  }
  function startGame() {
    setState("firstStep");
  }

  // Логика диалогов
  function nextDialogueText() {
    const newDialogueText = dialogueText.slice(1);
    setDialogueText(newDialogueText);
  }

  // Логика выполнения задания
  const currentTask = uncompletedTasks[0];
  function clickHandler(itm) {
    if (currentTask.itemName === itm.name) {
      const updatedList = uncompletedTasks.slice(1);
      setUncompletedTasks(updatedList);
    }
  }

  // Логика таймера
  const intervalId = useRef(null);
  function startTimer() {
    intervalId.current = setInterval(
      () => setCurrentTime((prevTime) => prevTime - 1),
      1000,
    );
  }

  // Блок рендера
  if (state === "readyToGame") {
    return (
      <>
        <div className="room">
          <div className="npcAndDialogue">
            <Npc />
            <Dialogue
              dialogueTexts={dialogueText}
              clickHandler={startGame}
              dialogueHandler={nextDialogueText}
            />
          </div>
        </div>
      </>
    );
  }
  if (state === "firstStep") {
    return (
      <>
        <div className="room">
          <div className="npcAndDialogue">
            <Npc />
            <Task currentTask={currentTask} clickHandler={clickHandler} />
          </div>
          {items.map((itm) => (
            <Item
              key={itm.name}
              name={itm.name}
              imgSrc={itm.src}
              position={itm.position}
              clickHandler={() => {
                clickHandler(itm);
              }}
            />
          ))}
        </div>
      </>
    );
  }
  if (state === "game" && uncompletedTasks.length !== 0) {
    return (
      <>
        <div className="room">
          <div className="npcAndDialogue">
            <Npc />
            <Task currentTask={currentTask} clickHandler={clickHandler} />
          </div>
          <Timer time={currentTime} />
          {items.map((itm) => (
            <Item
              key={itm.name}
              name={itm.name}
              imgSrc={itm.src}
              position={itm.position}
              clickHandler={() => {
                clickHandler(itm);
              }}
            />
          ))}
        </div>
      </>
    );
  }
  if (state === "game" && uncompletedTasks.length === 0) {
    return (
      <>
        <div className="room">
          <div className="npcAndDialogue">
            <Npc />
            <div className="task"> Все задания выполнены</div>
          </div>
          <Timer time={currentTime} />
          {items.map((itm) => (
            <Item
              key={itm.name}
              name={itm.name}
              imgSrc={itm.src}
              position={itm.position}
            />
          ))}
        </div>
      </>
    );
  }
  // if (state === "success") {
  //   return (
  //     <>
  //       <p> You won</p>
  //     </>
  //   );
  // }
  // if (state === "fail") {
  //   return (
  //     <>
  //       <p> You failed</p>
  //     </>
  //   );
  // }
}

import { useEffect, useRef, useState } from "react";
import { items, tasks, dialogueTexts } from "../../../data/objectFinderData.js";
import "../styles/Game.css";
import Task from "./Task.js";
import Item from "./Item.js";
import Dialogue from "./Dialogue.js";
import Timer from "./Timer.js";
import Npc from "./Npc.js";

export default function Game() {
  const [state, setState] = useState("readyToGame");
  const [dialogueText, setDialogueText] = useState(dialogueTexts.slice(0));
  const [uncompletedTasks, setUncompletedTasks] = useState(tasks.slice(0));
  const [currentTime, setCurrentTime] = useState(180);

  useEffect(
    () => (state === "gameWithTimer" ? startTimer() : stopTimer()),
    [state],
  );
  useEffect(() => {
    if (uncompletedTasks.length === 2) {
      setState("gameWithTimer");
    }
    stopGame(); // error ESLint: React Hook useEffect has a missing dependency: 'stopGame'. Either include it or remove the dependency array. (react-hooks/exhaustive-deps)
  }, [uncompletedTasks, currentTime]);

  function startGame() {
    setState("gameWithoutTimer");
  }
  function stopGame() {
    if (uncompletedTasks.length > 0 && currentTime === 0) {
      setState("fail");
    }
    if (uncompletedTasks.length === 0 && currentTime > 0) {
      setState("success");
    }
  }

  function nextDialogueText() {
    const newDialogueText = dialogueText.slice(1);
    setDialogueText(newDialogueText);
  }

  const completedTasks = tasks.filter(
    (task) => !uncompletedTasks.includes(task),
  );
  const currentTask = uncompletedTasks[0];
  function clickHandler(itm) {
    if (currentTask.itemName === itm.name) {
      const updatedList = uncompletedTasks.slice(1);
      setUncompletedTasks(updatedList);
    }
  }

  const intervalId = useRef(null);
  function startTimer() {
    intervalId.current = setInterval(
      () => setCurrentTime((prevTime) => prevTime - 1),
      1000,
    );
  }
  function stopTimer() {
    clearInterval(intervalId.current);
    intervalId.current = null;
  }

  const visibleItems = items.filter((itm) => {
    return !completedTasks.some((task) => task.itemName === itm.name);
  });
  if (state === "readyToGame") {
    return (
      <>
        <div className="room">
          <div className="npcAndText">
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
  if (state === "gameWithoutTimer") {
    return (
      <>
        <div className="room">
          <div className="npcAndText">
            <Npc />
            <Task currentTask={currentTask} clickHandler={clickHandler} />
          </div>
          {visibleItems.map((itm) => {
            return (
              <Item
                key={itm.name}
                name={itm.name}
                imgSrc={itm.src}
                position={itm.position}
                clickHandler={() => {
                  clickHandler(itm);
                }}
              />
            );
          })}
        </div>
      </>
    );
  }
  if (state === "gameWithTimer" && uncompletedTasks.length !== 0) {
    return (
      <>
        <div className="room">
          <div className="npcAndText">
            <Npc option={"glasses"} />
            <Task currentTask={currentTask} clickHandler={clickHandler} />
          </div>
          <Timer time={currentTime} />
          {visibleItems.map((itm) => (
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
  if (state === "success") {
    return (
      <>
        <div className="room">
          <div className="npcAndText">
            <Npc option={"glasses"} />
            <div className="task"> well done</div>
          </div>
          <Timer time={currentTime} />
          {visibleItems.map((itm) => (
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
  if (state === "fail") {
    return (
      <>
        <div className="room">
          <div className="npcAndText">
            <Npc option={"glasses"} />
            <div className="task"> Try again </div>
          </div>
          <Timer time={currentTime} />
          {visibleItems.map((itm) => (
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
}

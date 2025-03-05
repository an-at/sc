import "../styles/ObjectFinder.css";
import { useEffect, useRef, useState } from "react";
import { items, tasks, dialogueTexts } from "../../../data/objectFinderData.js";
import Task from "./Task.js";
import Item from "./Item.js";
import Dialogue from "./Dialogue.js";
import Timer from "./Timer.js";
import Npc from "./Npc.js";

/*
Вопросы
1. Как правильнее работать с таймером: очищать интервал внутри функции таймера или вызывать очищение снаружи
Код при очищении интервала изнутри
    const interval = setInterval(() => {
      setCurrentTime((prevTime) => {
        if (prevTime === 0 || state === "finish") {
          clearInterval(interval);
          return prevTime;
        }
        return prevTime - 1;
      });
    }, 1000);

Код при очищении снаружу
  useEffect(() => {
    if (uncompletedTasks.length > 0 && currentTime === 0) {
      setState("fail");
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
    if (uncompletedTasks.length === 0 && currentTime > 0) {
      setState("success");
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  }, [uncompletedTasks, currentTime]);
*/
/*
1) При первом попадании на экран происходит диалог с нпс
- изображение нпс
- фон заблюрен
- у нпс блок с диалогом
- в блоке с диалогом есть кнопка "вперед"
2) В диалоге игрок подтверждает готовность начать игру
3) Начинается игра
 */

export default function Game() {
  // Блок с состоянием игры
  const [state, setState] = useState("readyToGame");
  useEffect(() => {
    if (state === "game") {
      startTimer();
    }
  }, [state]);
  function startGame() {
    setState("game");
  }

  //Блок диалогов
  const [dialogueText, setDialogueText] = useState(dialogueTexts.slice(0));
  function nextDialogueText() {
    const newDialogueText = dialogueText.slice(1);
    setDialogueText(newDialogueText);
  }

  // Блок выполнения задания
  const [history, setHistory] = useState(tasks.slice(0));
  const [uncompletedTasks, setUncompletedTasks] = useState(tasks.slice(0));
  function clickHandler(itm) {
    if (uncompletedTasks[0].itemName === itm.name) {
      // if (uncompletedTasks.length > 0) {
      const updatedList = uncompletedTasks.slice(1);
      setUncompletedTasks(updatedList);
      // }
      setHistory((prevHistory) => {
        let updatedHistory = prevHistory;
        let index = prevHistory.length - uncompletedTasks.length;
        updatedHistory[index].isCompleted = true;
        return updatedHistory;
      });
    }
  }

  // Блок таймера
  const [currentTime, setCurrentTime] = useState(100);
  useEffect(() => {
    if (uncompletedTasks.length > 0 && currentTime === 0) {
      setState("fail");
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
    if (uncompletedTasks.length === 0 && currentTime > 0) {
      setState("success");
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  }, [uncompletedTasks, currentTime]);
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
  if (state === "game") {
    return (
      <>
        <Npc state={state} />
        <Task uncompletedTasks={uncompletedTasks} clickHandler={clickHandler} />
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
      </>
    );
  }
  if (state === "success") {
    return (
      <>
        <p> You won</p>
      </>
    );
  }
  if (state === "fail") {
    return (
      <>
        <p> You failed</p>
      </>
    );
  }
}

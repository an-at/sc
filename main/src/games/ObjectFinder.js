import "../games/ObjectFinder.css";
import { useEffect, useRef, useState } from "react";

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

export default function Board() {
  const items = [
    {
      name: "grey square",
      src: "https://placehold.co/100x100/grey/white?text=glasses",
      position: {
        position: "absolute",
        top: 70 + "%",
        left: 50 + "%",
      },
    },
    {
      name: "green square",
      src: "https://placehold.co/100x100/green/white?text=cat",
      position: {
        position: "absolute",
        top: 10 + "%",
        left: 10 + "%",
      },
    },
    {
      name: "yellow square",
      src: "https://placehold.co/100x100/yellow/grey?text=sofa",
      position: {
        position: "absolute",
        top: 15 + "%",
        left: 70 + "%",
      },
    },
  ];
  const tasks = [
    {
      index: 0,
      description: "Найди серый квадрат",
      itemName: "grey square",
      isCompleted: false,
    },
    {
      index: 1,
      description: "Найди зеленый квадрат",
      itemName: "green square",
      isCompleted: false,
    },
    {
      index: 2,
      description: "Найди желтый квадрат",
      itemName: "yellow square",
      isCompleted: false,
    },
  ];
  const dialogueTexts = ["text1", "text2", "text3", "text4", "text5"];

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

function Npc({ option }) {
  const renderOptrion = option
    ? "/img/characters/susie_dialogue_glasses.png"
    : "/img/characters/susie_dialogue.png";

  return (
    <>
      <img src={renderOptrion} className="npc" alt="npc" />
    </>
  );
}

function Dialogue({ clickHandler, dialogueHandler, dialogueTexts }) {
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

function Task({ uncompletedTasks }) {
  if (uncompletedTasks.length === 0) {
    return (
      <>
        <p className="task"> Все задания выполнены</p>
      </>
    );
  }

  const currentTask = uncompletedTasks[0];
  return (
    <>
      <p key={currentTask.index} className="task">
        {" "}
        {currentTask.description}{" "}
      </p>
    </>
  );
}

function Timer({ time }) {
  const minutes = Math.trunc(time / 60);
  const seconds = time % 60;
  const renderValue =
    time > 0 ? (
      <p>
        {minutes}:{seconds}
      </p>
    ) : (
      <p> Time is out</p>
    );

  return <>{renderValue}</>;
}

function Item({ name, imgSrc, position, clickHandler }) {
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

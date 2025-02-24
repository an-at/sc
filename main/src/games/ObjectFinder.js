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
  const npc = "/img/characters/gran_without_glasses.png";
  const dialogueBox = "/img/dialogue_boxes/dialogue_box_round.png";

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
  const [currentTime, setCurrentTime] = useState(5);
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
        <p> Are you ready ?</p>
        <button onClick={startGame}> start </button>
      </>
    );
  }
  if (state === "game") {
    return (
      <>
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

        <Task uncompletedTasks={uncompletedTasks} clickHandler={clickHandler} />

        <Timer time={currentTime} />

        <Npc imgCharacter={npc} dialogueBox={dialogueBox} />
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

function Npc({ imgCharacter, dialogueBox }) {
  return (
    <>
      <img src={imgCharacter} className="npc" />
      <img src={dialogueBox} className="dialogueBox" />
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

import "../games/ObjectFinder.css";
import { useState } from "react";

/*
5. Доработки: логика таймера - изменить: сделать передачу в секунды, логика окончания смотрится по секунда
затем преобразование в минуты для рендера

6. Доработки: убрать из стейта сообщение и ложную таску

7. посмотреть useEfect и сделать завершеине игры при истечении таймера
*/

export default function Board() {
  const objects = [
    {
      name: "grey square",
      src: "https://placehold.co/100x100/grey/white",
      position: {
        position: "absolute",
        top: 70 + "px",
        left: 50 + "px",
      },
    },
    {
      name: "green square",
      src: "https://placehold.co/100x100/green/white",
      position: {
        position: "absolute",
        top: 190 + "px",
        left: 150 + "px",
      },
    },
    {
      name: "yellow square",
      src: "https://placehold.co/100x100/yellow/white",
      position: {
        position: "absolute",
        top: 150 + "px",
        left: 90 + "px",
      },
    },
  ];
  const tasks = [
    {
      index: 0,
      description: "Найди серый квадрат",
      objectName: "grey square",
      isCompleted: false,
    },
    {
      index: 1,
      description: "Найди красный квадрат",
      objectName: "red square",
      isCompleted: false,
    },
    {
      index: 2,
      description: "Найди желтый квадрат",
      objectName: "yellow square",
      isCompleted: false,
    },
    // {
    //   index: 3,
    //   description: "Все задания выполнены",
    //   objectName: "lastTask",
    //   isCompleted: false,
    // },
  ];

  const [history, setHistory] = useState(tasks.slice(0));
  const [uncompletedTasks, setUncompletedTasks] = useState(tasks.slice(0));
  const [currentTime, setCurrentTime] = useState({
    minutes: 1,
    seconds: 5,
    message: null,
  });

  function clickHandler(obj) {
    console.log(obj);
    if (uncompletedTasks.length > 1) {
      const updatedList = uncompletedTasks.slice(1);
      setUncompletedTasks(updatedList);
    }
    setHistory((prevHistory) => {
      let updatedHistory = prevHistory;
      let index = prevHistory.length - uncompletedTasks.length;
      updatedHistory[index].isCompleted = true;
      return updatedHistory;
    });
  }

  // добавить условие
  return (
    <>
      {objects.map((obj) => (
        <Object
          key={obj.name}
          name={obj.name}
          imgSrc={obj.src}
          position={obj.position}
          clickHandler={() => {
            clickHandler(obj);
          }}
        />
      ))}

      <Task uncompletedTasks={uncompletedTasks} clickHandler={clickHandler} />

      <Timer time={currentTime} setTime={setCurrentTime} />
    </>
  );
}

function Npc({ imgCharacter }) {
  return <img src={imgCharacter} className="npc" />;
}

function Timer({ time, setTime }) {
  const currentTime = time;

  function startTimer() {
    const interval = setInterval(
      () =>
        setTime((prevTime) => {
          const updatedTime = { ...prevTime };
          if (updatedTime.minutes !== 0 || updatedTime.seconds !== 0) {
            if (updatedTime.seconds > 0) {
              updatedTime.seconds -= 1;
            } else {
              updatedTime.minutes -= 1;
              updatedTime.seconds += 59;
            }
          }
          if (updatedTime.minutes === 0 && updatedTime.seconds === 0) {
            updatedTime.message = "Time is up";
            clearInterval(interval);
          }

          return updatedTime;
        }),
      1000,
    );
  }

  const renderValue =
    currentTime.message === null ? (
      <p>
        {" "}
        {currentTime.minutes} min {currentTime.seconds} sec
      </p>
    ) : (
      <p> {currentTime.message} </p>
    );

  return (
    <>
      {/*сейчас при нажатии на таймер несколько раз он будет каждый раз ускоряться, я не стал это обрабатывать так как
            я сам в игре буду управлять стартом и стопом таймера, поэтому необходимости в обработке нет*/}
      <button onClick={startTimer}> Start timer </button>
      {renderValue}
    </>
  );
}

function Task({ uncompletedTasks, clickHandler }) {
  if (uncompletedTasks.length === 1) {
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
      <button onClick={clickHandler}> Click to complete task </button>
    </>
  );
}

function Object({ name, imgSrc, position, clickHandler }) {
  return (
    <>
      <img
        src={imgSrc}
        style={position}
        className="object"
        id={name}
        onClick={clickHandler}
      />
    </>
  );
}

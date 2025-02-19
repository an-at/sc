import '../games/ObjectFinder.css';
import {useState} from "react";

/*
Вопросы:
1. Работа ассинхронного кода не очень понятна
вот два варианта одной и той же функции, в первой функции у меня по клику сразу происходит изменение, а во второй только при втором клике
Я думал что в случае работы ассинхронного кода используются промисы и если одна функция зависит от другой, то она должна дожидаться выполнения первой
и только потом выполняться сама
---------------------
    function clickHandler(){
        setUncompletedTasks((prevTasks)=> {
            let updatedList = prevTasks.slice(0+1);
            return updatedList;
        })
        setCurrentTask(uncompletedTasks[0]);
    }
---------------------

        function clickHandler(){
            setUncompletedTasks((prevTasks)=> {
                    let updatedList = prevTasks.slice(0+1);
                    setCurrentTask(updatedList[0]);
                    return updatedList;
            })
    }
---------------------

2. Я задаю позиции абсолютными значениями, это значит что при изменении разрешения, все мои расположенные предметы "Поедут"
Можно ли сделать на страницах какие-то якоря и привязывать мои объекты к ним и чтобы эти якоря сохраняли положение при изменении
страницы

3. Где взять готовый хороший шаблон код стайла, чтобы при сохранении пробелы ставились, скобки переносились как нужно итд)

4. Мы говорили, что лучше все стейты хранить в одном месте. Если при этом хранить и логику, то от такого подхода толстеет один компонент.
Например, в таймере, по такой логике, мне нужно все хранить в Board, а сам таймер только рендерит. Смущает, что в таком случае у меня в одном компоненте
напихано все подрят. Насколько правильно будет хранить стейты в одном месте, но логику которая их использует в другой. Посмотри плиз пример с таймером
в нем я перенес только стейты Board, но сама логика таймера находится внутри компонента Timer. Насколько ОК/неОК так делать?
*/

export default function Board(){
    const objects = [
        {
            name: 'grey square',
            src: 'https://placehold.co/100x100/grey/white',
            position: {
                position: "absolute",
                top: 70 + "px",
                left: 50 + "px",
            }
        },
        {
            name: 'green square',
            src: 'https://placehold.co/100x100/green/white',
            position: {
                position: "absolute",
                top: 190 + "px",
                left: 150 + "px",
            }
        },
        {
            name: 'yellow square',
            src: 'https://placehold.co/100x100/yellow/white',
            position: {
                position: "absolute",
                top: 150 + "px",
                left: 90 + "px",
            }
        }
    ];
    const tasks = [
        {
            index: 0,
            description: 'Найди серый квадрат',
            objectName: 'grey square',
            isCompleted: false
        },
        {
            index: 1,
            description: 'Найди красный квадрат',
            objectName: 'red square',
            isCompleted: false
        },
        {
            index: 2,
            description: 'Найди желтый квадрат',
            objectName: 'yellow square',
            isCompleted: false
        },
        {
            index: 3,
            description: 'Все задания выполнены',
            objectName: 'lastTask',
            isCompleted: false
        }
    ];

    const [history, setHistory] = useState(tasks.slice(0));
    const [uncompletedTasks, setUncompletedTasks] = useState(tasks.slice(0));
    const [currentTask, setCurrentTask] = useState(uncompletedTasks[0]);
    const [currentTime, setCurrentTime] = useState({minutes: 1, seconds: 5, message:null});

    function clickHandler(){
        setUncompletedTasks((prevTasks)=> {
            if(prevTasks.length > 1){
                let updatedList = prevTasks.slice(0+1);
                setCurrentTask(updatedList[0]);
                return updatedList;
            }
            else {
                return prevTasks;
            }
        });
        setHistory((prevHistory) => {
            let updatedHistory = prevHistory;
            let index = prevHistory.length - uncompletedTasks.length;
            updatedHistory[index].isCompleted = true
            return updatedHistory;
        })
    }
    return (
       <>
           {objects.map((obj) =>
               <Object
                   key={obj.name}
                   name={obj.name}
                   imgSrc={obj.src}
                   position={obj.position}/>)
           }
           
           <Task uncompletedTasks={uncompletedTasks} clickHandler={clickHandler}/>

           <Timer time={currentTime} setTime={setCurrentTime}/>
       </>
    )
}

function Npc({ imgCharacter }){
    return (
        <img src={imgCharacter} className='npc'/>
    )
}

function Timer( {time, setTime} ){
    const currentTime = time;

    function startTimer(){
       const interval = setInterval(() => setTime(
            (prevTime) => {
                const updatedTime = {...prevTime};
                if (updatedTime.minutes !== 0 || updatedTime.seconds !== 0){
                    if (updatedTime.seconds > 0){
                        updatedTime.seconds -= 1;
                    }
                    else {
                        updatedTime.minutes -= 1;
                        updatedTime.seconds += 59;
                    }
                }
                if (updatedTime.minutes === 0 && updatedTime.seconds === 0){
                    updatedTime.message = 'Time is up';
                    clearInterval(interval);
                }

                return updatedTime;
            }
        ), 1000);
    }

    const renderValue = currentTime.message === null
        ? <p> {currentTime.minutes} min {currentTime.seconds} sec</p>
        : <p> {currentTime.message} </p>

    return(
        <>
            {/*сейчас при нажатии на таймер несколько раз он будет каждый раз ускоряться, я не стал это обрабатывать так как
            я сам в игре буду управлять стартом и стопом таймера, поэтому необходимости в обработке нет*/}
            <button onClick={startTimer}> Start timer </button>
            {renderValue}
        </>
    )
}

function Task({uncompletedTasks, clickHandler }){
    let currentTask = uncompletedTasks[0];
    return(
        <>
            <p key={currentTask.index} className='task'> {currentTask.description} </p>
            <button onClick={clickHandler}> Click to complete task </button>
        </>
    )
}

function Object({ name, imgSrc, position }){
    function handleClick(obj){
        console.log(obj)
    }

return(
    <>
        <img src={imgSrc} style={position} className='object' id={name} onClick={handleClick}/>
    </>
)
}
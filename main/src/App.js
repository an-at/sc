import './App.css';
import { useState } from 'react';


function MenuScreen(){
  return(
      <div className="menuScreen">
        <MenuBlock/>
        <Controls/>
      </div>
  )};

function BarScreen(){
    return(
        <div className="barScreen">
            <MyButton/>
        </div>
    )};

function MenuBlock(){
  const handleClick = (event) => { aler(event)};
  let a = 'a';
    return (
      <div className='menuBlock'>
        <button onClick = {(event) => { window.alert(event.target.innerText)}}> Начать</button>
        <button onClick = {aler}> Выход</button>
      </div>
  )};

function Controls() {
  return(
      <div className = 'controls'>
        <button>🔉</button>
      </div>
  )};

function aler(event, x){

    // window.alert('нажата кнопка ' + event.target.innerText);
    console.log(event);
    console.log(x);
}

function MyButton(){
    const [count, setCount] = useState(0);
    const handleClick = () => {
        setCount(count + 1);
    }

    return (
        <button onClick={handleClick}>
            Click {count}
        </button>)
}

function SwitchScreen(){
    const [menu, bar] = useState(true);

    const switcher = () => {
        bar(!menu);
    }

    let content;
    menu ? content = <MenuScreen/> : content = <BarScreen/>;

    return (
        <div>
            <button onClick={switcher}>
                Сменить экран
            </button>
            {content}
        </div>
    )
}

function App() {
    return (
        <SwitchScreen/>
    );
}

export default App;

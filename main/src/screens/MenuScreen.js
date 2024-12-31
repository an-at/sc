import './MenuScreen.css';

function MenuScreen(props){
    return(
        <div className="menuScreen">
            <MenuBlock toBar = {props.toBarScreen}/>
            <Controls/>
        </div>
    )}

function MenuBlock(props){
    return (
        <div className='menuBlock'>
            <button onClick = {props.toBar}> Начать </button>
            <button> Загрузить </button>
            <button> Авторы </button>
        </div>
    )}

function Controls() {
    return(
        <div className = 'controls'>
            <button></button>
        </div>
    )}

export default MenuScreen
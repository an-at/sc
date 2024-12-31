import './BarScreen.css';

function BarScreen(props){
    return(
        <div>
            <span>
                Это экран бара
            </span>
            <button onClick={props.toMenuScreen}>
                Go to menu!
            </button>
            <button onClick={props.toCrossroadScreen}>
                Go to crossroad!
            </button>
        </div>
    )
}

export default BarScreen;
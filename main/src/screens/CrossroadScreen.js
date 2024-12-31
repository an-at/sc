
function CrossroadScreen(props){
    return(
        <div>
            <span>
                Это экран развилки
            </span>
            <button onClick={props.toMenuScreen}>
                Go to menu!
            </button>
            <button onClick={props.toBarScreen}>
                Go to bar!
            </button>
        </div>
    )
}

export default CrossroadScreen;
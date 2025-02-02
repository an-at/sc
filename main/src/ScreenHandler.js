import { useState } from "react";
import MenuScreen from "./screens/MenuScreen";
import BarScreen from "./screens/BarScreen";
import CrossroadScreen from "./screens/CrossroadScreen";

function ScreenHandler() {
    const [screen, setScreen] = useState("menu");

    if (screen === "menu"){
        return <MenuScreen toBarScreen ={() => setScreen("bar")}/>;
    }

    if (screen === "bar"){
        return <BarScreen
            toMenuScreen = {() => setScreen("menu")}
            toCrossroadScreen = {() => setScreen("crossroad")}
        />;
    }

    if (screen === "crossroad"){
        return <CrossroadScreen
            toMenuScreen = {() => setScreen("menu")}
            toBarScreen = {() => setScreen("bar") }
        />;
    }

    return (
        <div> {screen} </div>
    )
}

export default ScreenHandler

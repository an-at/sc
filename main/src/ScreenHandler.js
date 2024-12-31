import {useState} from "react";
import MenuScreen from "./screens/MenuScreen";
import BarScreen from "./screens/BarScreen";
import CrossroadScreen from "./screens/CrossroadScreen";

function ScreenHandler(){
    let [menuState, setMenuState] = useState('menu');
    let screen;

    switch (menuState) {
        case 'menu':
            screen = <MenuScreen toBarScreen = {() => {setMenuState('bar')}}/>;
            break;
        case 'bar':
            screen = <BarScreen toMenuScreen = {() => {setMenuState('menu')}}
                                toCrossroadScreen = {() => {setMenuState('crossroad')}}/>
            break;
        case 'crossroad':
            screen = <CrossroadScreen toMenuScreen = {() => {setMenuState('menu')}}
                                      toBarScreen = {() => {setMenuState('bar')}}/>
    }

    return(
            <div>
                {screen}
            </div>
    )
}

export default ScreenHandler
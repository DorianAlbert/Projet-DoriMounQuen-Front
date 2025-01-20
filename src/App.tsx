import './App.css'
import {Route, Routes} from "react-router";
import HomePage from './components/HomePage.tsx'
import Earth from "./components/Earth.tsx";
import {HeroUIProvider} from "@heroui/react";

function App() {
    return (
        <HeroUIProvider>
            <Routes>
                <Route path="/" element={<Earth/>}>

                </Route>
                <Route path="/earth" element={<HomePage/>}>

                </Route>

            </Routes>
        </HeroUIProvider>
    )
}

export default App

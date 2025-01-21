import './App.css'
import {Route, Routes} from "react-router";
import {HeroUIProvider} from "@heroui/react";
import HomePage from "./components/HomePage.tsx";

function App() {
    return (
        <HeroUIProvider>
            <Routes>
                <Route path="/" element={<HomePage/>}>
                </Route>
            </Routes>
        </HeroUIProvider>
    )
}

export default App

import { Route, Routes } from "react-router-dom";
import LecturePage from "../pages/LecturePage"

function App() {

    return (
        <Routes>
            <Route path="/" element={<LecturePage />} />
        </Routes>
    );
}

export default App;
import { Route, Routes } from "react-router-dom";
import LecturePage from "../pages/LecturePage"
import LectureInsertForm from "../pages/LectureInsertForm"

function App() {

    return (
        <Routes>
            <Route path="/lecture/list" element={<LecturePage />} />
            
            <Route path="/lecture/insert" element={<LectureInsertForm />} />
        </Routes>
    );
}

export default App;

import Post from "./pages/Post";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/post/:id" element={<Post />} />
    </Routes>
  );
}

export default App;

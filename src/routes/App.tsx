import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostList from "../components/PostList";
import PostDetail from "../components/PostDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/" element={<PostList />} />
      </Routes>
    </Router>
  );
}

export default App;

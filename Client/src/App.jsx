import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Editor from "./editor/Editor";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import NotificationsPage from "./pages/NotificationsPage";
import DocumentsPage from "./pages/DocumentsPage";
import CollaboratorsPage from "./pages/CollaboratorsPage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/editor" element={<Editor/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/notifications" element={<NotificationsPage />} />
      <Route path="/documents" element={<DocumentsPage/>}/>
      <Route path="/collaborators" element={<CollaboratorsPage/>}/>
    </Routes>
  );
}

export default App;
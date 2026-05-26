import { Navigate, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation.jsx";
import AdminView from "./views/AdminView.jsx";
import BookView from "./views/BookView.jsx";
import MenuView from "./views/MenuView.jsx";

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-neutral-950 text-white">
      <Navigation />
      <Routes>
        <Route path="/" element={<Navigate to="/menu" replace />} />
        <Route path="/menu" element={<MenuView />} />
        <Route path="/book" element={<BookView />} />
        <Route path="/admin" element={<AdminView />} />
      </Routes>
    </div>
  );
}

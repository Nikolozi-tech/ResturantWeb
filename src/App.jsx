import { Navigate, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation.jsx";
import AdminView from "./views/AdminView.jsx";
import BookView from "./views/BookView.jsx";
import MenuView from "./views/MenuView.jsx";

function PublicShell({ children }) {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <Navigation />
      {children}
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicShell><MenuView /></PublicShell>} />
      <Route path="/menu" element={<PublicShell><MenuView /></PublicShell>} />
      <Route path="/book" element={<PublicShell><BookView /></PublicShell>} />
      <Route path="/admin" element={<AdminView />} />
      <Route path="*" element={<Navigate to="/menu" replace />} />
    </Routes>
  );
}

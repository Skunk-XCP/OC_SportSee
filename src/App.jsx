import { Dashboard } from "./scene/Dashboard/Dashboard";
import { Route, Routes, Navigate } from 'react-router-dom';

export function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/user/12" replace />} />
        <Route path="/user/:id" element={<Dashboard />} />
      </Routes>
    </>
  );
}
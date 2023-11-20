import { Dashboard } from "./scene/Dashboard/Dashboard";
import { Route, Routes } from 'react-router-dom';

export function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard userId="12" />} />
        <Route path="/user/:id" element={<Dashboard />} />
      </Routes>
    </>
  );
}
import { Dashboard } from "./scene/Dashboard/Dashboard";
import { Route, Routes, Navigate } from 'react-router-dom';
import { USER12_URL, USER18_URL } from "./config";


export function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={USER12_URL} replace />} />
        <Route path={USER12_URL} element={<Dashboard user={USER12_URL} />} />
        <Route path={USER18_URL} element={<Dashboard user={USER18_URL} />} />
      </Routes>
    </>
  );
}


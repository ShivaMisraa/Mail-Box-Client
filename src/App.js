import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './Authentication/Login';
import MainPage from './Component/MainPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/MainPage" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

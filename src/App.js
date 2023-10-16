import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './Authentication/Login';
import MainPage from './Component/MainPage';
import EmailList from './Component/MailView'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/MainPage" element={<MainPage />} />
        <Route path="/Mailview" element={<EmailList />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;

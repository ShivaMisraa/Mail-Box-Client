import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './Authentication/Login';
import MainPage from './Component/MainPage';
import EmailList from './Component/Inbox';
import ViewMail from "./Component/ViewMail";
 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/MainPage" element={<MainPage />} />
        <Route path="/EmailList" element={<EmailList />} />
        <Route path="/emails/:emailId" element={<ViewMail/>} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;

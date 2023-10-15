import React from "react";
import "./MainPage.css";
import MyTextEditor from "./TextEditor";

const MainPage = () => {
  return (
    <div>
      <div className="navbar">
        <div className="mailbox-content">
          <span>Welcome to your mailbox</span>
        </div>
      </div>
      <div className="text-editor">
      <MyTextEditor />
      </div>
    </div>
  );
};

export default MainPage;

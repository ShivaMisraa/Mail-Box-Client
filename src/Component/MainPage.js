import React from "react";
import "./MainPage.css";
import MyTextEditor from "./TextEditor";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();

  const inboxHandler = () => {
    navigate("/EmailList");
  };

  const logOutHandler = () => {
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  return (
    <div>
      <div className="navbar">
        <div className="mailbox-content">
          <span>Welcome to your mailbox</span>
        </div>

        <Button className="inbox-btn" onClick={logOutHandler}>
          LogOut
        </Button>
        <Button className="inbox-btn" onClick={inboxHandler}>
          Inbox
        </Button>
      </div>
      <div className="text-editor">
        <MyTextEditor />
      </div>
    </div>
  );
};

export default MainPage;

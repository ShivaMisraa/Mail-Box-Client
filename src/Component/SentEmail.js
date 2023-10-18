import React, { useEffect, useState } from "react";
import "./SentMail.css";
import { useSelector } from "react-redux";
import { selectAllEmails } from "../Store/emailSlice";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const SentEmail = () => {
  const userEmail = localStorage.getItem("userEmail");
  const [senderData, setSenderData] = useState([]);
  const allEmails = useSelector(selectAllEmails);

  const navigate = useNavigate();

  useEffect(() => {
    const filteredData = allEmails.filter((email) => email.sender === userEmail);
    setSenderData(filteredData);
  }, [userEmail, allEmails]);

  const backHandler = () => {
    navigate("/MainPage");
  };

  return (
    <div>
      <div className="navbar">
        <div className="mailbox-content">
          <span>Welcome to your mailbox</span>
        </div>
          <Button className="back-btn" onClick={backHandler}>
            Back
          </Button>
      </div>
      <div className="sent-email-container">
        <ul className="sent-email-list">
          {senderData.map((sender) => (
            <div key={sender.id} className="sent-email-item">
              <Link to={`/emails/${sender.id}`}>
                <li>
                  <strong>Recipient: {sender.recipient}</strong>
                  <strong>Subject: {sender.subject}</strong>
                </li>
              </Link>
            </div>
          ))}
          {senderData.length === 0 && (
            <p className="no-sent-emails-message">No sent emails to display.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SentEmail;

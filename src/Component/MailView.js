import React, { useEffect, useState } from "react";
import './MailView.css';
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const EmailList = () => {
  const [emails, setEmails] = useState([]);
  const navigate = useNavigate();

  const userEmail = localStorage.getItem("userEmail");

  const composeHandler = () => {
    navigate('/MainPage');
  }

  useEffect(() => {
    fetch("https://mail-box-client-171d8-default-rtdb.firebaseio.com/email.json")
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const emailArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          
          const filteredEmails = emailArray.filter((email) => {
            return email.recipient === userEmail;
          });
          setEmails(filteredEmails);
        } else {
          setEmails([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching emails:", error);
      });
  }, [userEmail]);

  return (
    <>
    <div className="navbar">
        <div className="mailbox-content">
          <span>Welcome to your mailbox</span>
        </div>
        <Button className="compose-btn" onClick={composeHandler}>
            Compose
        </Button>
    </div>
    <div className="email-list-container">
      <h2 className="h2-tag">Emails</h2>
      <ul className="email-list">
        {emails.length > 0 ? (
          emails.map((email) => (
            <li key={email.id} className="email-item"> 
              <strong>Recipient:</strong> {email.recipient}<br />
              <strong>Subject:</strong> {email.subject}<br />
              <strong>Message:</strong> {email.text}
            </li>
          ))
        ) : (
          <p className="no-emails-message">No emails to display.</p>
        )}
      </ul>
    </div>
    </>
  );
};

export default EmailList;

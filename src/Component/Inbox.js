import React, { useEffect, useState } from "react";
import "./Inbox.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmails, selectAllEmails } from "../Store/emailSlice";
import { Link } from "react-router-dom";
import BlueTick from "./blueTick";


const EmailList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const composeHandler = () => {
    navigate("/MainPage");
  };

  useEffect(() => {
    dispatch(fetchEmails());
  }, [dispatch]);

  const emails = useSelector(selectAllEmails);

  const [unreadCount, setUnreadCount] = useState(0);

  const markEmailAsUnread = (emailId) => {
    fetch(
      `https://mail-box-client-171d8-default-rtdb.firebaseio.com/email/${emailId}.json`
    )
      .then((response) => response.json())
      .then((emailData) => {
        emailData.blueTick = false;

        fetch(
          `https://mail-box-client-171d8-default-rtdb.firebaseio.com/email/${emailId}.json`,
          {
            method: "PUT",
            body: JSON.stringify(emailData),
            headers: {
              "Content-type": "application/json",
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log("Email marked as unread in Firebase");
          })
          .catch((error) => {
            console.error("Error marking email as unread in Firebase:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching email data:", error);
      });
  };
  const countUnreadMessages = () => {
    const count = emails.filter((email) => email.blueTick).length;
    setUnreadCount(count);
  };
  useEffect(() => {
    countUnreadMessages();
  }, [emails]);

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
        <div className="unread-count">Unread: {unreadCount}</div>
        <ul className="email-list">
          {emails.length > 0 ? (
            emails.map((email) => (
              <Link to={`/emails/${email.id}`} key={email.id}>
                <li
                  className={`email-item`}
                  onClick={() => markEmailAsUnread(email.id)}
                >
                  {email.blueTick ? <BlueTick /> : null}
                  <strong>Sender:</strong> {email.sender}
                  <strong> Subject:</strong> {email.subject}
                </li>
              </Link>
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

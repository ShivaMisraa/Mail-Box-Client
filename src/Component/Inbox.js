import React, { useEffect, useState } from "react";
import "./Inbox.css";
import { Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmailsPeriodically, selectAllEmails } from "../Store/emailSlice";
import { Link } from "react-router-dom";
import BlueTick from "./blueTick";
import useDeleteRequest from "../Custom-hooks/useDelete.js";

const EmailList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userEmail = localStorage.getItem("userEmail");

  const { deleteResource, isDeleting } = useDeleteRequest(); 


  const backHandler = () => {
    navigate("/MainPage");
  };

  useEffect(() => {
    dispatch(fetchEmailsPeriodically());
  }, [dispatch]);

  const emails = useSelector(selectAllEmails);

  const [unreadCount, setUnreadCount] = useState(0);

  const filteredEmails = emails.filter(
    (email) => email.recipient === userEmail
  );

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


  const deleteEmail = (emailId) => {
    deleteResource(`https://mail-box-client-171d8-default-rtdb.firebaseio.com/email/${emailId}.json`)
      .then((data) => {
        console.log('Email deleted from Firebase');
        dispatch({ type: 'email/deleteEmail', payload: emailId });
      })
      .catch((error) => {
        console.error('Error deleting email:', error);
      });
  };

  const countUnreadMessages = () => {
    const count = filteredEmails.filter((email) => email.blueTick).length;
    setUnreadCount(count);
  };

  useEffect(() => {
    countUnreadMessages();
  }, [filteredEmails]);

  return (
    <div className="inbox-main">
      <div className="navbar">
        <div className="mailbox-content">
          <span>Welcome to your mailbox</span>
        </div>
        <Button className="compose-btn" onClick={backHandler}>
          Back
        </Button>
      </div>
      <div className="email-list-container">
        <h2 className="h2-tag">Emails</h2>
        <div className="unread-count">Unread: {unreadCount}</div>
        <ul className="email-list">
          {filteredEmails.length > 0 ? (
            filteredEmails.map((email) => (
              <div key={email.id} className="email-item">
                <Button variant="outline-danger">
                  <Image
                    onClick={() => deleteEmail(email.id)}
                    src="https://cdn4.iconfinder.com/data/icons/round-buttons/512/blue_x.png"
                    alt="Delete"
                    style={{ width: "25px", height: "25px" }}
                  />
                </Button>
                <Link to={`/emails/${email.id}`}>
                  <li
                    className={`email-item `}
                    onClick={() => markEmailAsUnread(email.id)}
                  >
                    {email.blueTick ? <BlueTick /> : null}
                    <strong>Sender:</strong> {email.sender}
                    <strong> Subject:</strong> {email.subject}
                  </li>
                </Link>
              </div>
            ))
          ) : (
            <p className="no-emails-message">No emails to display.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default EmailList;

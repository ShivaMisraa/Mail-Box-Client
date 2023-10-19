import React from 'react';
import { useSelector } from 'react-redux';
import { useParams,useNavigate } from 'react-router-dom';
import './ViewMail.css'; 

const ViewMail = () => {
  const { emailId } = useParams();
  const navigate= useNavigate();

  const email = useSelector((state) => {
    const emails = state.emails.emails;
    return emails.find((email) => email.id === emailId);
  });

  if (!email) {
    return <div>Email not found</div>;
  }

  return (
    <div className='veiwMail-div'>
      <div className="navbar">
        <div className="mailbox-content">
          <span>Welcome to your mailbox</span>
        </div>
        </div>
    <div className="view-mail-container">
      <div className="view-mail-header">
        <h2 className="view-mail-title">Email Details</h2>
        <button className="view-mail-back-button" onClick={() => navigate('/EmailList')}>
          Back
        </button>
      </div>
      <div className="view-mail-content">
        <p><strong>Sender:</strong> {email.sender}</p>
        <p><strong>Subject:</strong> {email.subject}</p> 
        <p><strong>Message:</strong> {email.text}</p>
      </div>
    </div>
    </div>
  );
};

export default ViewMail;

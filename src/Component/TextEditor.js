import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./TextEditor.css";
import { Button } from "react-bootstrap";

const MyTextEditor = () => {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");

  const recipientRef = useRef(null);
  const subjectRef = useRef(null);
  const quillRef = useRef(null);

  const userEmail = localStorage.getItem("userEmail");
  // console.log(userEmail)

  const handleRecipientChange = (e) => {
    setRecipient(e.target.value);
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleTextChange = (value) => {
    setText(value);
  };

  const sanitizeHtml = (html) => {
   
    return html.replace(/<\/?p>/g, "");
  };

  const handleSendClick = () => {
   
    const sanitizedText = sanitizeHtml(text);
    
    fetch("https://mail-box-client-171d8-default-rtdb.firebaseio.com/email.json", {
      method: "POST",
      body: JSON.stringify({
        recipient,
        subject,
        text: sanitizedText,
        sender: userEmail 
      }),
      headers: {
        "Content-type": "application/json"
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Email sent successfully!");

        setRecipient("");
        setSubject("");
        quillRef.current.getEditor().setContents([]);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  return (
    <div>
      <div className="input-container">
        <input
          className="mail"
          type="email"
          placeholder="Recipient"
          value={recipient}
          onChange={handleRecipientChange}
          ref={recipientRef}
          required
        />
        <input
          className="subject"
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={handleSubjectChange}
          ref={subjectRef}
        />
      </div>
      <ReactQuill
        value={text}
        onChange={handleTextChange}
        modules={MyTextEditor.modules}
        ref={quillRef}
      />
      <Button variant="outline-info mt-2" onClick={handleSendClick}>
        Send
      </Button>
    </div>
  );
};

MyTextEditor.modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'background': [] }],
    ['link'],
  ],
};

MyTextEditor.formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'background', 'link'
];

export default MyTextEditor;

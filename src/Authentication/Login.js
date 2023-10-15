import React, { useState ,useRef} from "react";
import {Container,Button,FormControl,Form,Row,Col,} from "react-bootstrap";
import {useNavigate} from 'react-router-dom'
import "./Login.css";


const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);

  const navigate = useNavigate();

  const switchAuthHandler = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current?.value;
    const enteredPassword = passwordInputRef.current?.value;

    if (!isLogin) {
      const enteredConfirmPassword = confirmPasswordInputRef.current?.value;

      if (enteredPassword !== enteredConfirmPassword) {
        alert("Passwords do not match.");
        return;
      }
    }

    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";

    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCVS1aIPWfiuQKRK6KELaKg3mHA5r5kOas";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCVS1aIPWfiuQKRK6KELaKg3mHA5r5kOas";
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        const token = data.idToken;
        console.log(token);
        console.log("Congratulations!! User has been logged in");

        emailInputRef.current.value = "";
        passwordInputRef.current.value = "";
        navigate('./MainPage')
      })
      .catch((err) => {
        alert(err.message);
        console.error(err.message);
      });
  };

  return (
    <div className="main-div">
      <Container className="p-3 my-5 d-flex flex-column w-50">
        <div className="text-center mb-3">
          <p className={`neon-text ${isLogin ? "neon-signin" : "neon-signup"}`}>
            {isLogin ? "Sign in" : "Sign up"}
          </p>
        </div>

        <Form.Group className="mb-4">
          <Form.Label>Email address</Form.Label>
          <FormControl type="email" required ref={emailInputRef} />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Password</Form.Label>
          <FormControl type="password" ref={passwordInputRef} />
        </Form.Group>

        {!isLogin && (
          <Form.Group className="mb-4">
            <Form.Label>Confirm Password</Form.Label>
            <FormControl
              type="password"
              ref={confirmPasswordInputRef}
              required
            />
          </Form.Group>
        )}

        <Row className="mb-4">
          <Col xs="auto" className="d-flex align-items-center">
            <Form.Check
              type="checkbox"
              id="flexCheckDefault"
              label="Remember me"
            />
          </Col>
          <Col>
            <a href="#!">Forgot password?</a>
          </Col>
        </Row>

        <Button className="mb-4 w-100" onClick={submitHandler}>
          {isLogin ? "Sign in" : "Sign up"}
        </Button>

        <p className="text-center">
          {isLogin ? "Not a member? " : "Already a member? "}
          <span onClick={switchAuthHandler} className="link-text">
            {isLogin ? "Register" : "Sign in with an existing account"}
          </span>
        </p>
      </Container>
    </div>
  );
};

export default Login;

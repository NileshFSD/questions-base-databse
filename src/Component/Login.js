import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../Firebase/Firebase-config";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [users, setUsers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storeRef = query(collection(db, "users"), orderBy("created", "asc"));
    onSnapshot(storeRef, (snapshot) => {
      setUsers(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  const handleLogin = async (e) => {
    const findUser = users
      .filter((user) => {
        return user?.data.username === emailRef.current.value;
      })
      .map((user) => {
        return user?.data.email;
      })
      .toString();

    e.preventDefault();
    const email = findUser;
    const password = passwordRef.current.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);

      setTimeout(() => {
        toast.success("Login Successfully");
        navigate("/profile");
      }, 1000);
    } catch (error) {
      toast.warning("invalid username/password");
    }

    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <div className="login-container">
      <form className="login-form" method="post">
        <br />
        <label htmlFor="login-email">Username </label>
        <input
          type="text"
          name="login-email"
          id="login-email"
          placeholder="Username"
          autoComplete="off"
          ref={emailRef}
        />

        <br />
        <label htmlFor="login-password">Password </label>
        <input
          type="password"
          name="login-password"
          id="login-password"
          placeholder="*********"
          required
          autoComplete="off"
          ref={passwordRef}
        />

        <button onClick={handleLogin} className="login-btn">
          SIGN IN
        </button>
        <br />
        <button className="forgot-btn">FORGOT PASSWORD</button>
        <br />
        <Link to="/register">
          <button className="register-btn">Register</button>
        </Link>
      </form>
      <ToastContainer position="top-left" />
    </div>
  );
};

export default Login;

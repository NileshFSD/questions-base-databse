import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { auth, db } from "../Firebase/Firebase-config";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";

const Register = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [users, setUsers] = useState([]);
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

  const checkUsername = users.map((user) => {
    return user?.data.username;
  });

  const checkEmail = users.map((user) => {
    return user?.data.email;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (checkUsername.includes(username)) {
        toast.info("Please choose another username");
      } else if (checkEmail.includes(email)) {
        toast.info("This email is already registered, please enter another email");
      } else if (password !== confirmPassword) {
        toast.info("Password does not match, please re-Entre the same password");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        await addDoc(collection(db, "users"), {
          username: username,
          email: email,
          created: Timestamp.now(),
        });

        setTimeout(() => {
          toast.success("Registration done, we are redirecting you to on user page");
          navigate("/profile");
        }, 1000);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" method="post" onSubmit={handleSubmit}>
        <label htmlFor="name">Username </label>
        <input
          type="text"
          name="name"
          placeholder="Username"
          id="name"
          onChange={(e) => setUserName(e.target.value)}
          required
          autoComplete="off"
        />

        <br />
        <label htmlFor="password">Password </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="*********"
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength="8"
        />
        <br />
        <label htmlFor="password">Confirm Password </label>
        <input
          type="password"
          name="confirm-password"
          id="password"
          placeholder="*********"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <label htmlFor="email">Email </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
        />
        <br />

        <div>
          <button type="submit" className="register-btn">
            Register
          </button>
        </div>
        <div>
          <hr />
          <span>Already have an account?</span>
          <Link to="/login">
            <strong> Login</strong>
          </Link>
        </div>
      </form>
      <ToastContainer position="top-left" />
    </div>
  );
};

export default Register;

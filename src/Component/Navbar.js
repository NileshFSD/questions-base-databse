import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { HiMenu } from "react-icons/hi";
import { FaPlus, FaUserAlt } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { auth, db } from "../Firebase/Firebase-config";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";

const Navbar = () => {
  const [loggedInUser, setLoggedInUser] = useState();
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

    auth.onAuthStateChanged((user) => {
      setLoggedInUser(user);
    });
  }, []);

  const profile = users.find((user) => {
    return user?.data.email === loggedInUser?.email;
  });

  const handleLogout = async (e) => {
    e.preventDefault();
    await signOut(auth);
    toast.success("SignOut Done");
    navigate("/");
  };

  return (
    <nav
      id="nav"
      className="navbar navbar-expand-lg navbar-light  bg-primary py-1"
    >
      <Link className="link navbar-brand" to="/">
        AnyAsk
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <FiMenu className="menubar" />
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          {loggedInUser?.email ? (
            <>
              <li className="nav-item active">
                <Link className="link nav-link" to="/browse">
                  <HiMenu className="nav-icons" />
                  BROWSE
                </Link>
              </li>{" "}
              <li className="nav-item active">
                <Link className="link nav-link" to="/add">
                  <FaPlus className="nav-icons" />
                  ADD NEW QUESTIONS
                </Link>
              </li>
              <li className="nav-item">
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenu2"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <FaUserAlt className="nav-icons" /> {profile?.data.username}
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenu2"
                  >
                    <button className="dropdown-item" type="button">
                      Action
                    </button>
                    <button className="dropdown-item" type="button">
                      Another action
                    </button>
                    <button className="dropdown-item" type="button">
                      Change Password
                    </button>

                    <button
                      className="dropdown-item"
                      type="button"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </li>
            </>
          ) : (
            <li className="nav-item active">
              <Link className="link nav-link" to="/login">
                <FiLogIn className="nav-icons" />
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
      <ToastContainer position="top-left" />
    </nav>
  );
};

export default Navbar;

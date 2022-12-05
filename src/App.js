import "../src/Styles/style.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./Component/Footer";
import Home from "./Component/Home";
import Navbar from "./Component/Navbar";
import Register from "./Component/Register";
import Login from "./Component/Login";
import Profile from "./Component/Profile";
import Browse from "./Component/Browse";
import Add from "./Component/Add";
import User from "./Component/User";
// import UserContext from "./Context/UserContext";

function App() {
  return (
    <div className="App">
      {/* <UserContext> */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/browse" element={<Browse />}>
            <Route path=":user" element={<User />} />
          </Route>
          <Route path="/add" element={<Add />} />
        </Routes>
        <Footer />
      </Router>
      {/* </UserContext> */}
    </div>
  );
}

export default App;

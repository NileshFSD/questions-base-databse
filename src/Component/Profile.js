import { useContext, useEffect, useState } from "react";
import { auth } from "../Firebase/Firebase-config";
import { FaSearch } from "react-icons/fa";
import CreateContext from "../Context/CreateContext";

function Profile() {
  const users = useContext(CreateContext);

  const [loggedInUser, setLoggedInUser] = useState();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setLoggedInUser(user?.email);
    });
  }, []);

  const date = users.find((user) => {
    return user?.data.email === loggedInUser;
  })?.data.created;

  const joinDate = new Date(date?.seconds * 1000).toDateString();

  return (
    <div className="profile">
      <div className="profile-menu">
        <div>
          <input type="text" name="search" id="search" />
          <button className="search-btn">
            {" "}
            <FaSearch />
          </button>
        </div>

        <div className="profile-table-container">
          <table className="profile-table">
            <thead>
              <tr>
                <th>Verified Questions</th>
                <th>Unverified Questions</th>
                <th>User Rank</th>
                <th>Join date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>0</td>
                <td>0</td>
                <td>Standard User</td>
                <td> {`${joinDate.slice(0, 3)},${joinDate.slice(3)}`}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="ver">
          <h3>Verified Questions</h3>
          <div className="ver-que">No Questions Found</div>
        </div>
        <div className="unver">
          <h3>Unverified Questions</h3>
          <div className="ver-que">No Questions Found</div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

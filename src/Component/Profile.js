import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { auth, db } from "../Firebase/Firebase-config";
import { FaSearch } from "react-icons/fa";

function Profile() {
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState();
  // const navigate = useNavigate();

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

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setLoggedInUser(user);
    });
  }, []);

  const userDetails = users.find((user) => {
    return user?.data.email === loggedInUser?.email;
  });

  console.log(userDetails?.data.username);

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
                <td> Friday, Nov 25th, 2022</td>
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

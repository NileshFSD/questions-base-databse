import { useEffect, useState } from "react";
import { auth } from "../Firebase/Firebase-config";
import CreateContext from "../Context/CreateContext";

const UserContext = (props) => {
  const [users, setUsers] = useState();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUsers(user);
    });
  }, []);

  const user = users?.email;

  return (
    <CreateContext.Provider value={user}>
      {props.children}
    </CreateContext.Provider>
  );
};

export default UserContext;

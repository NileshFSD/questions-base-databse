import { useEffect, useState } from "react";
import { db } from "../Firebase/Firebase-config";
import CreateContext from "../Context/CreateContext";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

const UserContext = (props) => {
  const [users, setUsers] = useState();

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

  return (
    <CreateContext.Provider value={users}>
      {props.children}
    </CreateContext.Provider>
  );
};

export default UserContext;

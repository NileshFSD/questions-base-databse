import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { db } from "../Firebase/Firebase-config";

const Data = () => {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    const storeRef = query(
      collection(db, "questions"),
      orderBy("created", "asc")
    );

    onSnapshot(storeRef, (snapshot) => {
      setQuestions(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  return (
    <div>
      <Outlet context={questions} />
    </div>
  );
};

export default Data;

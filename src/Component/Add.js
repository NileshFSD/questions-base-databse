import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { category } from "../Data/Add-que";
import { type } from "../Data/Add-que";
import { difficulty } from "../Data/Add-que";
import { ToastContainer, toast } from "react-toastify";
import { auth, db } from "../Firebase/Firebase-config";

const Add = () => {
  const [loggedInUser, setLoggedInUser] = useState();
  const [users, setUsers] = useState([]);
  const [cateV, setCateV] = useState();
  const [typeV, setTypeV] = useState();
  const [difficultyV, setDifficultyV] = useState();
  const [que, setQue] = useState();
  const [ans1, setAns1] = useState();
  const [ans2, setAns2] = useState();
  const [ans3, setAns3] = useState();
  const [correctAns, setCorrectAns] = useState();
  const [ansOpt, setAnsOpt] = useState();
  const [rad, setRad] = useState();
  const id = Math.floor(Math.random() * Math.random().toString().slice(11));

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setLoggedInUser(user);
    });

    const userRef = query(collection(db, "users"), orderBy("created", "asc"));

    onSnapshot(userRef, (snapshot) => {
      setUsers(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  const username = users.find((user) => {
    return user?.data.email === loggedInUser?.email;
  })?.data.username;

  function handleType(e) {
    setAnsOpt(e.target.value);
    setTypeV(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (ansOpt === "Multiple Choice") {
      try {
        await addDoc(collection(db, "questions"), {
          category: cateV,
          type: typeV,
          difficulty: difficultyV,
          question: que,
          correct_ans: correctAns,
          incorrect_ans1: ans1,
          incorrect_ans2: ans2,
          incorrect_ans3: ans3,
          created: Timestamp.now(),
          id: id,
          user: username,
        });

        toast.success("Question Added");

        e.target.reset();
      } catch (error) {
        toast.error(error);
      }
    } else {
      try {
        await addDoc(collection(db, "questions"), {
          category: cateV,
          type: typeV,
          difficulty: difficultyV,
          question: que,
          correct_ans: rad,
          created: Timestamp.now(),
          id: id,
          user: username,
        });
        toast.success("Question Added");

        e.target.reset();
      } catch (error) {
        toast.error(error);
      }
    }
  };

  return (
    <div className="add-que">
      <ToastContainer position="top-left" />
      <h4>Add new question</h4>
      <form className="add-form" onSubmit={handleSubmit}>
        <div className="add-form-select">
          <div>
            Category <br />
            <select
              name="category"
              id="category"
              onChange={(e) => setCateV(e.target.value)}
            >
              <option defaultValue=""></option>
              {category.map((c) => {
                return (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            Type <br />
            <select name="type" id="type" onClick={handleType}>
              {type.map((t) => {
                return (
                  <option key={t.id} value={t.choice}>
                    {t.choice}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            Difficulty <br />
            <select
              name="difficulty"
              id="difficulty"
              onChange={(e) => setDifficultyV(e.target.value)}
            >
              <option defaultValue=""></option>
              {difficulty.map((d) => {
                return (
                  <option key={d.id} value={d.type}>
                    {d.type}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="que">
          <label htmlFor="question">Question</label>
          <input
            type="text"
            name="question"
            id="question"
            onChange={(e) => setQue(e.target.value)}
          />
        </div>

        <div className="ans">
          {ansOpt === "Multiple Choice" ? (
            <>
              <div>
                <label htmlFor="contact-ans">Correct Ans</label>
                <br />
                <input
                  type="text"
                  name="correct-ans"
                  id="correct-ans"
                  onChange={(e) => setCorrectAns(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="contact-ans">Answer 1</label>
                <br />
                <input
                  type="text"
                  name="ans-1"
                  id="ans-1"
                  onChange={(e) => setAns1(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="contact-ans">Answer 2</label>
                <br />
                <input
                  type="text"
                  name="ans-2"
                  id="ans-2"
                  onChange={(e) => setAns2(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="contact-ans">Answer 3</label>
                <br />
                <input
                  type="text"
                  name="ans-3"
                  id="ans-3"
                  onChange={(e) => setAns3(e.target.value)}
                />
              </div>
            </>
          ) : (
            <div className="ans-radio">
              <div>
                <label htmlFor="true">True</label>
                <input
                  type="radio"
                  name="true-false"
                  id="true"
                  className="true"
                  defaultValue="True"
                  onChange={(e) => setRad(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="false">False</label>
                <input
                  type="radio"
                  name="true-false"
                  id="false"
                  defaultValue="False"
                  onChange={(e) => setRad(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>

        <div className="submit">
          <button className="submit-btn" type="submit">
            Submit
          </button>
        </div>
        <br />
      </form>
    </div>
  );
};

export default Add;

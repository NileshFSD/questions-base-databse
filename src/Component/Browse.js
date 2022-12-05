import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FaSearch, FaSort } from "react-icons/fa";
import { db } from "../Firebase/Firebase-config";
import ReactPaginate from "react-paginate";
import { Link, Outlet } from "react-router-dom";

const Browse = () => {
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const userPerPage = 15;
  const pageVisited = pageNumber * userPerPage;
  const [sort, setSort] = useState();

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

  const pageCount = Math.ceil(questions.length / userPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleSort = (e) => {
    !sort ? setSort(true) : setSort(false);
  };

  if (sort === true) {
    questions.sort((a, b) => a.data.id - b.data.id);
  } else if (sort === false) {
    questions.sort((a, b) => b.data.id - a.data.id);
  }

  return (
    <div className="browse-container">
      <Outlet context={questions} />
      <div className="browse">
        <div>
          <input
            type="text"
            name="search"
            id="search"
            onChange={(e) => setSearchValue(e.target.value)}
            autoComplete="off"
          />
          <select
            name="search"
            id="choose-opt"
            onChange={(e) => setSearch(e.target.value)}
          >
            <option>Choose</option>
            <option value="question">Question</option>
            <option value="user">User</option>
            <option value="category">Category</option>
          </select>
          <span>
            <FaSearch className="search-icon" />
          </span>
        </div>
        <div className="browse-table-container">
          <table className="browse-table">
            <thead>
              <tr>
                <th>
                  Id <FaSort onClick={handleSort} />
                </th>
                <th>Category</th>
                <th>Type</th>
                <th>Difficulty</th>
                <th>Questions </th>
                <th>Created By</th>
              </tr>
            </thead>
            <tbody>
              {questions
                .slice(pageVisited, pageVisited + userPerPage)
                .filter((que) => {
                  if (search === "question") {
                    return que?.data.question.includes(searchValue);
                  } else if (search === "user") {
                    return que?.data.user === searchValue;
                  } else if (search === "category") {
                    return que?.data.category === searchValue;
                  } else if (searchValue === "") {
                    return que;
                  }
                })
                .map((que) => {
                  return (
                    <tr key={que?.data.id}>
                      <td>{que?.data.id}</td>
                      <td>{que?.data.category}</td>
                      <td>{que?.data.type}</td>
                      <td> {que?.data.difficulty}</td>
                      <td>{que?.data.question}</td>

                      <td>
                        {" "}
                        <Link className="link" to={`/browse/${que?.id}`}>
                          {que?.data.user}{" "}
                        </Link>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <ReactPaginate
          previousLabel={`Previous`}
          nextLabel={`Next`}
          breakLabel={`...`}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          onPageChange={changePage}
          containerClassName="pagination justify-content-center margin-bottom"
          pageClassName="page-items"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          activeClassName="active"
        />
      </div>
    </div>
  );
};

export default Browse;

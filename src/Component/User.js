import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../Firebase/Firebase-config";
import { FaSearch, FaSort } from "react-icons/fa";
import { useOutletContext, useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";

function User() {
  const [pageNumber, setPageNumber] = useState(0);
  const userPerPage = 15;
  const pageVisited = pageNumber * userPerPage;

  const questions = useOutletContext();
  const queId = useParams();
  const [users, setUsers] = useState([]);
  const [sort, setSort] = useState();
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const storeRef = query(
      collection(db, "questions"),
      orderBy("created", "asc")
    );
    onSnapshot(storeRef, (snapshot) => {
      setUsers(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  const username = users.find((que) => {
    return que.id === queId.user;
  })?.data.user;

  const que = questions.filter((que) => {
    return que?.data.user === username;
  });
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
    <div className="profile">
      <div className="profile-menu">
        <div>
          <input
            type="text"
            name="search"
            id="search"
            onChange={(e) => setSearchValue(e.target.value)}
            autoComplete="off"
          />

          <span>
            <FaSearch className="search-icon" />
          </span>
        </div>

        <div className="profile-table-container">
          <h3>{`${username}'s Profile`}</h3>
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
                <td>{que.length}</td>
                <td>0</td>
                <td>Standard User</td>
                <td> Friday, Nov 25th, 2022</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="ver">
          <h3>Verified Questions</h3>

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
                </tr>
              </thead>
              <tbody>
                {que
                  .slice(pageVisited, pageVisited + userPerPage)
                  .filter((item) => {
                    return item?.data.question.includes(searchValue);
                  })
                  .map((item) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.data.id}</td>
                        <td>{item?.data.category}</td>
                        <td>{item?.data.type}</td>
                        <td>{item?.data.difficulty}</td>
                        <td>{item?.data.question}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          {/* ------------------------------------------- */}
        </div>
        <div className="unver">
          <h3>Unverified Questions</h3>
          <div className="ver-que">No Questions Found</div>
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
}

export default User;

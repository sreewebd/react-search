import React, { useState, useEffect } from "react";

const Search = () => {
  const [inputData, setInputData] = useState({ searchInput: "" });
  const [alphabetData, setAlphabetData] = useState({ alphabet: "" });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const url = "https://jsonplaceholder.typicode.com/users";
    fetch(url)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  console.log(users);

  const onAlphabetClick = (e) => {
    setAlphabetData({ alphabet: e.target.value });
    console.log(alphabetData);
  };

  const onSearchInputChange = (e) => {
    setInputData({ searchInput: e.target.value });
  };

  const prepareAlphabets = () => {
    let result = [];
    for (let i = 65; i < 91; i++) {
      result.push(
        <button
          className="btn btn-info m-1"
          type="button"
          key={i}
          onClick={onAlphabetClick}
          value={String.fromCharCode(i)}
        >
          {String.fromCharCode(i)}
        </button>
      );
    }
    return result;
  };

  const elementContainsSearchString = (searchInput, element) =>
    searchInput
      ? element.name.toLowerCase().includes(searchInput.toLowerCase())
      : false;

  const filterItems = (users) => {
    let result = [];
    const { searchInput } = inputData;
    const { alphabet } = alphabetData;
    if ((users && searchInput) || (users && alphabet)) {
      result = users.filter(
        (element) =>
          element.name.charAt(0).toLowerCase() === alphabet.toLowerCase() ||
          elementContainsSearchString(searchInput, element)
      );
    } else {
      result = users || [];
    }
    // result = result.map((item) => <li>{item.name}</li>);
    return result;
  };

  const filtered_list = filterItems(users);

  return (
    <>
      <div className="row my-5">
        <div className="col-md-12 text-center">
          <h3>Search Component</h3>
        </div>
      </div>
      <div className="row my-3">
        <div className="col-md-4">
          <label htmlFor="input-search">Search By Input</label>
          <input
            type="text"
            id="input-search"
            className="form-control"
            onChange={onSearchInputChange}
            placeholder="Enter Search Term"
          />
        </div>
        {/* .cols-4 */}
        <div className="col-md-8">
          <label htmlFor="alphabet-search">Search By Alphabet</label>
          <div>{prepareAlphabets()}</div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>User Name</th>
              </tr>
            </thead>
            <tbody>
              {filtered_list.map((user) => {
                const { id, name, username } = user;
                return (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{username}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* <div className="col-md-12">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>User Name</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const { id, name, username } = user;
                return (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{username}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div> */}
      </div>
    </>
  );
};

export default Search;

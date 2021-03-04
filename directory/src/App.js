import React, { useReducer, useRef } from "react";
import "./App.css";
import SearchForm from "./components/SearchForm";

function TodoList() {
  const inputRef = useRef();
  const [items, dispatch] = useReducer((state, action) => {
    switch (action.type) {
    case "add":
      return [
        ...state,
        {
          id: state.length * Math.random(),
          name: action.name
        }
      ];
      // Bonus: Remove a todo from the list.
    case "remove":
      return state.filter((_, index) => {
        return index !== action.index;
      });
    default:
      return state;
    }
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch({
      type: "add",
      name: inputRef.current.value
    });
    inputRef.current.value = "";
  };

  return (
    <div className="container text-center">
      <h1>Employee Directory</h1>
      <form className="form-group mt-5" onSubmit={handleSubmit}>
        <input
          className="form-control"
          ref={inputRef}
          placeholder="Start typing what you need to do..."
        />
          <button className="btn btn-success mt-3 mb-5" type="submit">
          Search
        </button>
    
      </form>
    
      <h4>Search History:</h4>
      <ul className="list-group">
        {items.map((item, index) => (
          <li className="list-group-item" key={item.id}>
            {item.name}
            <button
              className="btn btn-danger ml-5"
              onClick={() => dispatch({ type: "remove", index })}
            >
              X Remove
            </button>
          </li>
        ))}
      </ul>
      <SearchForm
          //handleFormSubmit={handleSubmit}
          //results={inputRef}
        />


    </div>
  );
}

export default TodoList;

import React, { useReducer, useRef } from "react";
import "./App.css";
import SearchForm from "./components/SearchForm";
import {Dropdown} from 'react-bootstrap';
import {DropdownButton} from 'react-bootstrap';

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

  //search function from WW3 Schools 
  //https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_filter_list

function searchFunction() {
    let input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");//connect this to the ui 
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

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
      <SearchForm>

      <button
              className="btn btn-danger ml-5"
              onClick= {searchFunction}>
                Search Employees 
            </button>
     
      </SearchForm>


      <DropdownButton id="dropdown-basic-button" title="Search By">
      <Dropdown.Item href="#/action-1">Job Title</Dropdown.Item>
      <Dropdown.Item href="#/action-2">First Name</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Last Name</Dropdown.Item>
    </DropdownButton>



      </div>
  );
}

export default TodoList;

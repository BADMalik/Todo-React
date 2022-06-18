import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import List from "./List";

const App = () => {
  let [suggestions, setSuggestions] = useState([]);
  let [formInput, setFormInput] = useState("");
  let [todos, setTodos] = useState([]);

  const callAPI = (e) => {
    setFormInput(e.target.value);
    setTimeout(() => {
      axios
        .get("https://restcountries.com/v3.1/name/" + e.target.value)
        .then(function (response) {
          setSuggestions(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }, 1000);
  };

  const selected = (e) => {
    let newData = e.target.value;
    setFormInput(newData);
  };

  const addTodo = (e) => {
    todos.push({
      name: formInput,
      done: false,
    });
    setTodos(todos);
    let newDropDown = suggestions.filter((suggestion) => {
      return suggestion.name.common !== formInput;
    });
    setFormInput("");
    //  console.log("newDropdown", newDropDown, formInput);
    setSuggestions(newDropDown);
  };

  const handleStatus = (e) => {
    console.log("handle", e);
    let newList = todos.map((todo) => {
      if (todo.name === e.name) {
        return {
          done: !e.done,
          name: todo.name,
        };
      } else {
        return todo;
      }
    });
    setTodos(newList);
  };

  return (
    <div className="App">
      <h3 className="container mx-auto">Bilal's Practise Todo List</h3>
      <br />
      <div className="grid grid-cols-2">
        <div>
          <input
            value={formInput || ""}
            className="break-after-auto tailwind-form"
            type="text"
            onChange={callAPI}
          ></input>
        </div>
        <div>
          <button type="click" onClick={addTodo} className="button">
            Add
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1">
        <div>
          <div>
            <select
              value={formInput ? formInput : ""}
              className="px-4 rounded-full"
              onChange={selected}
            >
              <option disabled value="">
                Please Select a value
              </option>
              {suggestions.length > 0 &&
                suggestions.map((suggestion) => {
                  return (
                    <option value={suggestion.name.common}>
                      {suggestion.name.common}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1">
        <List list={todos} handleStatus={handleStatus} />
      </div>
    </div>
  );
};

export default App;

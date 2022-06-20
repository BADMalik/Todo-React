import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import List from "./List";
import Select from "./Select";

const App = () => {
  let [suggestions, setSuggestions] = useState([]);
  let [formInput, setFormInput] = useState("");
  let [todos, setTodos] = useState([]);
  let [searchCountries, setSearchCountries] = useState(false);

  const getCountries = (e) => {
    setFormInput(e);
    axios
      .get("https://restcountries.com/v3.1/name/" + e)
      .then(function (response) {
        setSuggestions(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const setFormInputField = (e) => {
    let newData = e.target.value;
    setSearchCountries(false);
    setFormInput(newData);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (formInput && searchCountries) {
        getCountries(formInput);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [formInput]);

  // const debounce = (func) => {
  //   let timer;
  //   return function (...args) {
  //     const context = this;
  //     if (timer) clearTimeout(timer);
  //     timer = setTimeout(() => {
  //       timer = null;
  //       func.apply(context, args);
  //     }, 100);
  //   };
  // };

  // const optimizedFn = useCallback(debounce(getCountries), []);

  const addTodo = (e) => {
    todos.push({
      name: formInput,
      done: false,
    });
    setTodos(todos);
    setNewDropDown();
    setFormInput("");
  };

  const setNewDropDown = () => {
    let newDropDown = suggestions.filter((suggestion) => {
      return suggestion.name.common !== formInput;
    });
    setSuggestions(newDropDown);
  };

  const handleStatus = (e) => {
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
            onChange={(e) => {
              setFormInput(e.target.value);
              setSearchCountries(true);
            }}
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
          <Select
            formInput={formInput}
            suggestions={suggestions}
            setFormInputField={setFormInputField}
          />
        </div>
      </div>
      <div className="grid grid-cols-1">
        <List list={todos} handleStatus={handleStatus} />
      </div>
    </div>
  );
};

export default App;

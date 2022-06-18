import React, { useState, useEffect } from "react";
import "./App.css";

const List = ({ list, handleStatus }) => {
  return (
    <div>
      <ul>
        {list &&
          list.length > 0 &&
          list.map((prop) => {
            return (
              <li className={!prop.done ? "" : "strike"} key={prop.name}>
                {prop.name}
                <button onClick={(e) => handleStatus(prop)} className="px-4">
                  {!prop.done ? "Mark Done" : "Mark Undone"}
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default List;

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
                  {!prop.done ? "✔" : "❌"}
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default List;

import "./App.css";

const List = ({ list, handleStatus }) => {
  return (
    <div>
      <ul>
        {list.map((listItem) => {
          return (
            <li className={!listItem.done ? "" : "strike"} key={listItem.name}>
              {listItem.name}
              <button onClick={() => handleStatus(listItem)} className="px-4">
                {!listItem.done ? "✔" : "❌"}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default List;

const Select = (props) => {
  console.log(props);
  let { formInput, suggestions, setFormInputField } = props;
  formInput = 123213;
  console.log(formInput, "FORMINOPUT");
  return (
    <div>
      <select
        value={formInput ? formInput : ""}
        className="px-4 rounded-full"
        onChange={setFormInputField}
      >
        <option disabled value="">
          Please Select a value
        </option>
        {suggestions.length > 0 &&
          suggestions.map((suggestion) => {
            return (
              <option
                key={suggestion.name.common}
                value={suggestion.name.common}
              >
                {suggestion.name.common}
              </option>
            );
          })}
      </select>
    </div>
  );
};

export default Select;

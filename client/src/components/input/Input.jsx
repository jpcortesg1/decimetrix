const Input = ({ value, setValue, type, label, options }) => {
  if (type === "select") {
    return (
      <div className=" mb-3">
        <label className="form-label" htmlFor="typeUser">
          {label}
        </label>
        <select
          className="form-select"
          id="typeUser"
          onChange={(e) => {
            setValue(e.target.value);
          }}
        >
          <option defaultValue>Select value</option>
          {options?.map((op, i) => (
            <option key={i} value={op[0]}>
              {op[1]}
            </option>
          ))}
        </select>
      </div>
    );
  }
  return (
    <div className="mb-3">
      <label className="form-label w-100">
        {label}
        <input
          type={type}
          className="form-control"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          required
          autoComplete="off"
        />
      </label>
    </div>
  );
};

export default Input;

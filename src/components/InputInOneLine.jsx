import React from "react";

const InputInOneLine = (props) => {
  const {
    labelName,
    controlName,
    controlType,
    onChange,
    err,
    data,
    ...rest
  } = props;
  return (
    <div className="row mb-3  text-wrap">
      <label htmlFor={controlName} className="col-sm-2 col-form-label">
        {labelName}
      </label>
      <div className="col-sm-10 fw-bold">
        <input
          type={controlType}
          id={controlName}
          name={controlName}
          value={data[controlName]}
          onChange={onChange}
          className="form-control"
          {...rest}
        ></input>
      </div>
      {err[controlName] && (
        <div className="alert alert-warning">{err[controlName]}</div>
      )}
    </div>
  );
};

InputInOneLine.defaultProps = {
  controlType: "text",
};

export default InputInOneLine;

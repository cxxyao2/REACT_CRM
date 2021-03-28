import React from "react";

function Radiogroup(props) {
  const { controlName, data, selected, onChange, groupName, ...rest } = props;
  return (
    <>
      <fieldset className="row mb-3">
        <legend className="col-form-label col-sm-2 pt-0">{groupName}</legend>
        <div className="col-sm-10">
          {data.map((item) => (
            <div className="form-check" key={controlName.concat(item.id)}>
              <input
                className="form-check-input"
                type="radio"
                name={controlName}
                id={controlName.concat(item.id)}
                value={item.id}
                checked={item.id === selected}
                onChange={() => onChange(item.id)}
                {...rest}
              />
              <label
                className="form-check-label"
                htmlFor={controlName.concat(item.id)}
              >
                {item.name}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </>
  );
}

export default Radiogroup;

import React from "react";

function Check(props) {
  const { id, value, label, checked } = props.activity;
  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        value={value}
        id={"flexCheckChecked".concat(id)}
        checked={checked}
        onClick={() => props.onChange(props.activity)}
      />
      <label className="form-check-label" for={"flexCheckChecked".concat(id)}>
        {label}
      </label>
    </div>
  );
}

function CheckGroup(props) {
  return props.activityList.map((activity, index) => (
    <Check key={index} activity={activity} onChange={props.onChange} />
  ));
}

export default CheckGroup;

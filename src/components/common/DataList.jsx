import React from "react";

function DataList(props) {
  const {
    inputName,
    formData,
    data,
    dataListTitle,
    errorMessages,
    onChange,
    ...rest
  } = props;
  let defaultName = "";
  if (formData && formData[inputName]) {
    const defaultObj = data.find(function (item) {
      return item._id === formData[inputName];
    });
    if (defaultObj) {
      defaultName = defaultObj.name;
    }
  }

  return (
    <>
      <label htmlFor={inputName} className="form-label">
        {dataListTitle}
        <b className="text-danger fs-5">*</b>
      </label>
      <input
        name={inputName}
        className="form-control"
        list="datalistOptions"
        id={inputName}
        placeholder="......"
        onChange={onChange}
        defaultValue={defaultName}
        {...rest}
      />
      <datalist id="datalistOptions">
        {data.map((member, index) => (
          <option key={member._id} value={member.name}>
            {member.name}
          </option>
        ))}
      </datalist>
      {errorMessages[inputName] && (
        <div className="alert alert-warning" role="alert">
          {errorMessages[inputName]}
        </div>
      )}
    </>
  );
}

DataList.defaultProps = {
  errorMessages: false,
};

export default DataList;

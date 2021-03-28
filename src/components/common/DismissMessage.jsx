import React from "react";

function DismissMessage({ message, type }) {
  return (
    <div
      className={"alert alert-"
        .concat(type)
        .concat("alert-dismissible fade show")}
      role="alert"
    >
      <strong>{message}</strong>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
}

export default DismissMessage;

import React from "react";

const Tab = (props) => {
  const { tabData } = props;
  return (
    <ul className="nav nav-tabs" id="myTab" role="tablist">
      {tabData.map((tab) => (
        <li className="nav-item" role="presentation">
          <a
            className={tab.isActive ? "nav-link active" : "nav-link"}
            id={`${tab.name}-tab`}
            data-bs-toggle="tab"
            href={"#".concat(tab.name)}
            role="tab"
            aria-controls={tab.name}
            aria-selected={tab.isActive ? "true" : "false"}
          >
            {tab.name}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Tab;

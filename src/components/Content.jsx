import React from "react";

const Content = (props) => {
  const { tabData, ...rest } = props;
  return (
    <div className="tab-content" id="myTabContent">
      {tabData.map(({ name, isActive, component: Component }) => (
        <div
          className={isActive ? "tab-pane fade show active" : "tab-pane fade"}
          id={name}
          role="tabpanel"
          aria-labelledby={name.concat("-tab")}
        >
          <Component onChange={props.onChange} {...rest} />
        </div>
      ))}
    </div>
  );
};

export default Content;

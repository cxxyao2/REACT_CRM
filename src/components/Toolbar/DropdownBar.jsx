import React from "react";
import {
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";

function DropdownBar(props) {
  let { url } = useRouteMatch();
  return (
    <div className="position-absolute top-2 end-10 bg-info clearfix">
      <ul>
        <li>
          <Link to={`${url}/channels`}>Digging Channels</Link>
        </li>
        <li>
          <Link to={`${url}/stocks`}>Stock Keeping</Link>
        </li>
        <li>
          <Link to={`${url}/visits`}>Activity Reports</Link>
        </li>
      </ul>
    </div>
  );
}

export default DropdownBar;

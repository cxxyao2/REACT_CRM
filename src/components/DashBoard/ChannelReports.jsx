import React from "react";
import Avatar from "../avatar/Avatar";
import "./ChannelReports.css";

function ChannelReports(props) {
  console.log("user", props.user);
  return (
    <div className="bg-light">
      <h5 className="p-2 mt-1 border-start border-primary border-3">
        Plans And Accomplishments
      </h5>
      <table className="table  border-white table-bordered text-center report_table">
        <thead>
          <tr className="table-row">
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Finished</th>
            <th scope="col">Percentage(%)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td style={{ verticalAlign: "middle" }}>
              <Avatar user={props.user} />
            </td>
            <td style={{ verticalAlign: "middle" }}>12</td>
            <td style={{ verticalAlign: "middle" }}>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  aria-valuenow="0"
                  aria-valuemin="0"
                  style={{ width: "50%" }}
                  aria-valuemax="100"
                >
                  50%
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>
              <Avatar user={props.user} />
            </td>
            <td style={{ verticalAlign: "middle" }}>120</td>

            <td style={{ verticalAlign: "middle" }}>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  aria-valuenow="0"
                  aria-valuemin="0"
                  style={{ width: "80%" }}
                  aria-valuemax="100"
                >
                  80%
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>
              <Avatar user={props.user} />
            </td>
            <td style={{ verticalAlign: "middle" }}>15</td>

            <td style={{ verticalAlign: "middle" }}>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  aria-valuenow="0"
                  aria-valuemin="0"
                  style={{ width: "60%" }}
                  aria-valuemax="100"
                >
                  60%
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      {/* TODO new channel digging  成功 */}
      {/* TODO 显示模式柱形图*/}
    </div>
  );
}

export default ChannelReports;

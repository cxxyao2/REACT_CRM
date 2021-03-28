import React, { Component } from "react";
import Table from "../Table/Table";

class ItinerariesTable extends Component {
  columns = [
    { path: "salesmanName", label: "Name" },
    { path: "year", label: "Year" },
    { path: "month", label: "Month" },
    { path: "latitude", label: "Lat" },
    { path: "longitude", label: "Lng" },
    { path: "count", label: "Count" },
  ];

  raiseSort = (path) => {
    this.props.onSort(path);
  };

  render() {
    const { itineraries, sortColumn } = this.props;
    console.log("table itineraries is", itineraries);
    console.log("table sortColumn is", sortColumn);

    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={this.raiseSort}
        data={itineraries}
      />
    );
  }
}

export default ItinerariesTable;

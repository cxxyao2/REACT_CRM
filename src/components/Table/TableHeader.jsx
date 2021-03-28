import React, { Component } from 'react';

// columns: array
// sortColumn: object
// onSort: function

class TableHeader extends Component {
  raiseSort = column => {
    const sortColumn = {...this.props.sortColumn};
    if (sortColumn.column === column )
      sortColumn.order = sortColumn.order === "asc"? "desc": "asc";
    else {
      sortColumn.column = column;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  }

  renderSortIcon = column =>{
    const { sortColumn } = this.props;
    if(column.path !== sortColumn.column) return null;
    if(sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>
    return <i className="fa fa-sort-desc"></i>
  }

  render() { 
    return (
      <thead>
        {this.props.columns.map(column => (
          <th className="clickable" key={column.path || column.key} onClick={() => this.raiseSort(column.path)}>{column.label}{this.renderSortIcon(column)}</th>
        ))}
      </thead>
    );
  }
}
 
export default TableHeader;
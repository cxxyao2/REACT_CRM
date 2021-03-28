import React from "react";
import * as yup from "yup";
import _ from "lodash";
import Form from "../Form";
import * as userService from "../../services/userService";
import { dateYMD, getTodayYMD } from "../../utils/dateFormat";
import * as itineraryService from "../../services/itineraryservice";
import ItinerariesTable from "./ItinerariesTable";
import Pagination from "../common/pagination";
import { paginate } from "../../utils/paginate";
import MultiLocationForm from "./MultiLocationForm";
import RechartCom from "./RechartCom";

class VisitReports extends Form {
  state = {
    name: "",
    selectedMan: {},
    fromDate: getTodayYMD(),
    toDate: getTodayYMD(),
    salesperson: [],
    FilterResult: [],
    showNameList: false,
    chartData: [],
    errors: [],
    sortPath: { column: "year", order: "asc" },
    pageSize: 4,
    currentPage: 1,
  };

  schema = yup.object().shape({
    name: yup.string().required(),
    fromDate: yup.date().required(),
    toDate: yup.date().required(),
  });

  getSalesperson = async () => {
    const promise = userService.getUsersByDepartment("sales");
    const { data } = await promise;
    this.setState({ salesperson: data });
    this.setState({ FilterResult: data });
  };

  validate = () => {
    const { name, fromDate, toDate } = this.state;
    let errorList = null;
    this.schema
      .validate({
        name,
        fromDate,
        toDate,
      })
      .catch(function (err) {
        if (!err) return null;
        errorList = { ...err };
        console.log("errors is  ", err.errors);
      });
    return errorList;
  };

  getItineraries = async () => {
    const { name, fromDate, toDate } = this.state;
    let salesmanName = "salesman".concat("=", name);
    let startDate = "fromdate".concat("=", dateYMD(fromDate));
    let endDate = "todate".concat("=", dateYMD(toDate));
    let query = salesmanName.concat("&", startDate, "&", endDate);
    try {
      const promise = itineraryService.getReport(query);
      console.log("query is", query);
      const { data } = await promise;
      this.setState({ chartData: data });
    } catch (error) {
      console.log("error is ", error.response.data);
    }
  };

  componentDidMount() {
    try {
      this.getSalesperson();
    } catch (ex) {
      console.log("error network");
      console.log(ex.response.data);
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) {
      console.log(errors);
      return;
    }
    this.doSubmit();
  };

  handleSort = (path) => {
    this.setState({ sortPath: path });
  };

  doSubmit = () => {
    this.getItineraries();
    // data.byCustomerNameDate
    // _id: salesmanName, customerName, customerRegion, month, year
    // visitNum

    // data.byLocationNameDate
    // _id: salesmanName, month, year, latitude, longitude
    // visitNum
    // show table, chart, map ,
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleNameChange = (event) => {
    console.log(event.target.value);
    this.setState({ name: event.target.value });
    if (this.state.salesperson.length < 1) return;
    const menList = [...this.state.salesperson];
    const filterTxt = event.target.value.toUpperCase();
    let newList = menList.filter(
      (man) => man.name.toUpperCase().indexOf(filterTxt) > -1
    );
    this.setState({ FilterResult: newList });
    this.setState({ showNameList: true });
  };

  handleSelectMan = (man) => {
    this.setState({ selectedMan: man });
    this.setState({ name: man.name });
    this.setState({ showNameList: false });
  };

  handleChangeFrom = (event) => {
    this.setState({ fromDate: event.target.value });
  };

  handleChangeTo = (event) => {
    this.setState({ toDate: event.target.value });
  };

  getPagedData = () => {
    const { pageSize, currentPage, sortPath, chartData: allData } = this.state;
    let filtered = allData["byLocationNameDate"];
    if (!filtered || filtered.length < 1)
      return { totalCount: 0, locationData: [] };

    const sorted = _.orderBy(filtered, [sortPath.column], [sortPath.order]);
    const currentPageData = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, locationData: currentPageData };
  };

  getGoogleMapData = () => {
    const { chartData: allData } = this.state;
    let filtered = allData["byLocationNameDate"];
    if (!filtered || filtered.length < 1)
      return { markerCount: 0, markerData: [] };

    let markerData = [];
    filtered.forEach((loc) => {
      markerData.push({
        name: loc.customerName,
        lat: loc.latitude,
        lng: loc.longitude,
      });
    });

    return { markerCount: markerData.length, markerData: markerData };
  };

  getBarData = () => {
    const { chartData: allData } = this.state;
    let filtered = allData["byCustomerNameDate"];
    if (!filtered || filtered.length < 1) return { barCounter: 0, barData: [] };

    let barData = [];
    filtered.forEach((loc) => {
      barData.push({
        name: loc.customerName,
        visited: loc.count,
      });
    });

    return { barCounter: barData.length, barData: barData };
  };

  render() {
    const { totalCount, locationData } = this.getPagedData();
    const { markerCount, markerData } = this.getGoogleMapData();
    const { barCounter, barData } = this.getBarData();
    console.log("bar data is ", barData);

    return (
      <>
        <div className="container bg-white">
          <form onSubmit={this.handleSubmit}>
            <div className="mb-1">
              <label htmlFor="salesperson" className="form-label">
                Select a salesman
              </label>
              <input
                id="salesperson"
                name="salesperson"
                type="text"
                value={this.state.name}
                autocomplete="off"
                className="form-control"
                onChange={this.handleNameChange}
              />
              <ul className="list-group">
                {this.state.FilterResult.length >= 1 &&
                  this.state.showNameList &&
                  this.state.FilterResult.map((man) => (
                    <li
                      onClick={() => this.handleSelectMan(man)}
                      key={man._id}
                      name={man._id}
                      className={
                        man === this.state.selectedMan
                          ? "list-group-item active"
                          : "list-group-item"
                      }
                    >
                      {man.name}
                    </li>
                  ))}
              </ul>
            </div>

            <div className="mb-3">
              <label htmlFor="fromDate" className="form-label">
                From Date:
              </label>
              <input
                id="fromDate"
                name="fromDate"
                type="date"
                value={this.state.fromDate}
                className="form-control"
                onChange={this.handleChangeFrom}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="toDate" className="form-label">
                To Date:
              </label>
              <input
                id="toDate"
                name="toDate"
                type="date"
                value={this.state.toDate}
                className="form-control"
                onChange={this.handleChangeTo}
              />
            </div>
            <button className="btn btn-primary" disabled={this.validate()}>
              Search
            </button>
          </form>
        </div>

        <div className="container">
          {totalCount <= 0 && <p>No data found.</p>}
          {totalCount > 0 && (
            <>
              <ItinerariesTable
                itineraries={locationData}
                sortColumn={this.state.sortPath}
                onSort={this.handleSort}
              />
              <Pagination
                itemsCount={totalCount}
                pageSize={this.state.pageSize}
                currentPage={this.state.currentPage}
                onPageChange={this.handlePageChange}
              />
            </>
          )}
        </div>

        {barCounter >= 1 && (
          <div className="container">
            <RechartCom data={barData} dataKeys={["visited"]} />
          </div>
        )}

        {markerCount >= 1 && (
          <div className="container">
            <MultiLocationForm markData={markerData} />
          </div>
        )}
      </>
    );
  }
}

export default VisitReports;

import React, { Component } from "react";
import { connect } from "react-redux";
import "./PlaceOrder.css";

import { itemAdded, itemMoved } from "../../store/reducers/cartItems";
import { clientAdded, clientMoved } from "../../store/reducers/cartClient";
import { loadCustomers } from "../../store/reducers/customers";
import { loadProducts } from "../../store/reducers/products";

import SearchItemBar from "./SearchItemBar";
import { paginate } from "../../utils/paginate";
import Pagination from "../common/pagination";
import _ from "lodash";
import PlaceOrderProduct from "./PlaceOrderProduct";
import DataList from "../common/DataList";
import CustomerInfo from "../CustomerInfo";
import { getCategories } from "../../services/masterDataService";

class PlaceOrder extends Component {
  constructor(props) {
    super(props);
    this.pageSize = 4;
    this.state = {
      categories: undefined,
      filteredProduct: undefined,
      selectedCustomer: undefined,
      currentPage: 1,
      fromPage: 1,
      sortPath: { column: "name", order: "asc" },
      errors: { customer: undefined },
      formCustomers: undefined,
    };
  }

  getMasterData = async () => {
    try {
      await this.props.loadCustomers();
      await this.props.loadProducts();
      const result = await getCategories();
      this.setState({
        categories: result.data,
        formCustomers: this.props.customers,
      });
    } catch (err) {
      console.log("error  is,", JSON.stringify(err));
    }
  };

  componentDidMount() {
    this.getMasterData();
  }

  handleFilter = (filteredProduct) => {
    this.setState({ filteredProduct, fromPage: 1 });
  };

  handleCustomer = (e) => {
    const inputValue = e.target.value;
    const obj = this.props.customers.find(function (item) {
      return item.name === inputValue;
    });
    const newErrors = { ...this.state.errors };
    this.props.clientMoved();
    if (!obj) {
      newErrors[e.target.name] = inputValue + " does not exist in database.";
      this.setState({ errors: newErrors });
      this.setState({ selectedCustomer: undefined });
    } else {
      newErrors[e.target.name] = undefined;
      this.setState({ selectedCustomer: obj });
      this.props.clientAdded(obj);
    }
    this.setState({ errors: newErrors });
  };

  // 1,2,3 newFromPage=1,  ==> 2,3,4 newFromPage=2
  handlePageChange = (page, newFromPage = undefined) => {
    this.setState({ currentPage: page });
    if (newFromPage) {
      this.setState({ fromPage: newFromPage });
    }
  };

  handleAddItem = (product, qty) => {
    if (!this.state.selectedCustomer) {
      alert("Please select a client firstly.");
      return;
    }
    let newItem = {
      id: product._id,
      customerId: this.state.selectedCustomer._id,
      quantity: qty,
      price: 10,
      coupon: "aaaa",
      product: product,
      customer: this.state.selectedCustomer,
    };

    this.props.itemAdded(newItem);
  };

  getPagedData = () => {
    const { filteredProduct, currentPage, sortPath } = this.state;
    let filtered = filteredProduct;
    if (!filtered || filtered.length < 1)
      return { totalCount: 0, currentPageData: [] };

    const sorted = _.orderBy(filtered, [sortPath.column], [sortPath.order]);
    const currentPageData = paginate(sorted, currentPage, this.pageSize);

    return { totalCount: filtered.length, currentPageData };
  };

  render() {
    const { totalCount, currentPageData } = this.getPagedData();
    const {
      categories,
      errors,
      selectedCustomer,
      formCustomers,
      fromPage,
    } = this.state;
    return (
      <div className="bg-light bg-gradient border-bottom p-1">
        <form className="row d-flex justify-content-center m-1">
          <h5>Place Order</h5>
          <span>
            Select the product series:<b className="text-danger fs-5">*</b>
          </span>
          {!categories && (
            <div className="alert alert-warning my-1">
              No valid category. Please maintain the category data firstly.
            </div>
          )}
          {categories && (
            <SearchItemBar
              onFilter={this.handleFilter}
              categories={categories}
            />
          )}
          {!formCustomers && (
            <div className="alert alert-warning my-2">
              No valid customer. Please maintain the customer data firstly.
            </div>
          )}
          {formCustomers && (
            <DataList
              inputName="customer"
              data={formCustomers}
              dataListTitle={"Select a client:"}
              onChange={this.handleCustomer}
              errorMessages={errors}
            />
          )}
          {selectedCustomer && <CustomerInfo customer={selectedCustomer} />}
          <hr />
          <div className="row clearfix">
            {!currentPageData && (
              <div className="alert alert-warning">No valid product.</div>
            )}
            {currentPageData &&
              currentPageData.map((product, index) => (
                <PlaceOrderProduct
                  key={product._id}
                  product={product}
                  index={index}
                  onClick={this.handleAddItem}
                />
              ))}
          </div>
          <Pagination
            itemsCount={totalCount}
            pageSize={this.pageSize}
            fromPage={fromPage}
            currentPage={this.state.currentPage}
            onPageChange={this.handlePageChange}
          />
        </form>
      </div>
    );
  }
}

// bugs:    state.entities.bugs.list
const mapStateToProps = (state) => ({
  items: state.entities.items,
  customers: state.entities.customers.list,
});

const mapDispatchToProps = {
  loadCustomers,
  loadProducts,
  itemAdded,
  itemMoved,
  clientAdded,
  clientMoved,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaceOrder);

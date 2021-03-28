import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";

function SearchItemBar(props) {
  const products = useSelector((state) => state.entities.products.list);

  const inputRef = useRef(null);
  const categoryRef = useRef(null);
  const [searchError, setSearchError] = useState({ show: false, message: "" });

  const onFilter = () => {
    setSearchError({ show: false, message: "" });
    if (!products || !props.categories) return;

    const filterCategory = categoryRef.current.value;
    const categoryObj = props.categories.filter((category) => {
      return category._id === filterCategory;
    });

    const filterKey = inputRef.current.value;
    if (!filterCategory || filterCategory === "") {
      setSearchError({
        show: true,
        message: "Please select a valid category.",
      });
      return;
    }

    const filteredProducts = products.filter(
      (product) =>
        (filterCategory ? product.category === filterCategory : true) &&
        (filterKey ? product.name.toLowerCase().includes(filterKey) : true)
    );
    if (!(filteredProducts && filteredProducts.length >= 1))
      setSearchError({
        show: true,
        message: `No data is available for category {${categoryObj[0].name}}   and code/name {${filterKey}} `,
      });

    props.onFilter(filteredProducts);
  };

  return (
    <div className="row g-0 mb-1 my-2">
      <div className="col-sm-3 col-3">
        <label className="visually-hidden" htmlFor="specificSizeSelect">
          Categories
        </label>
        <select
          ref={categoryRef}
          className="form-select  bg-light"
          id="specificSizeSelect"
        >
          <option value="">Choose a category</option>
          {props.categories &&
            props.categories.map((category, index) => (
              <option value={category._id} key={index}>
                {category.name}
              </option>
            ))}
        </select>
      </div>
      <div className="col-sm-7 col-7">
        <label className="visually-hidden" htmlFor="specificSizeInputName">
          Name
        </label>
        <input
          ref={inputRef}
          className="form-control"
          type="text"
          placeholder="Enter product code,name,series..."
          aria-label="Product code ,name,series"
          autoFocus
        />
      </div>
      <div className="col-sm-2 col-2">
        <button
          className="btn  order_searchButton"
          type="button"
          onClick={onFilter}
        >
          <i className="fa fa-search" style={{ fontSize: "1rem" }}></i>
        </button>
      </div>
      {searchError.show && (
        <div className="alert alert-warning my-2">{searchError.message}</div>
      )}
    </div>
  );
}

export default SearchItemBar;

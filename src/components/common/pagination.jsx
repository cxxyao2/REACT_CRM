import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
// imr, sfc

const Pagination = (props) => {
  const displayPageNum = 3; // e.g pre 2 3 4 next.
  const { itemsCount, pageSize, currentPage, onPageChange, fromPage } = props;
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  let toPage = 0;
  if (fromPage + displayPageNum <= pagesCount + 1) {
    toPage = fromPage + displayPageNum;
  } else {
    toPage = pagesCount + 1;
  }
  const pages = _.range(fromPage, toPage);

  return (
    pagesCount > 1 && (
      <nav aria-label="Page navigation">
        <ul className="pagination my-2 justify-content-center">
          <li className="page-item">
            <a
              className="page-link"
              onClick={() => {
                let page = 0;
                if (fromPage - 1 >= 1) {
                  page = fromPage - 1;
                } else {
                  page = 1;
                }
                onPageChange(page, page);
              }}
            >
              &lt;&lt;
            </a>
          </li>
          {pages.map((page) => (
            <li
              key={page}
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
            >
              <a className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a
              className="page-link"
              onClick={() => {
                let page = 0;
                if (fromPage + displayPageNum <= pagesCount) {
                  page = fromPage + displayPageNum;
                } else {
                  page = pagesCount;
                }
                let newPageFrom = fromPage + 1;
                if (newPageFrom + displayPageNum - 1 <= pagesCount) {
                } else {
                  newPageFrom = undefined;
                }
                onPageChange(page, newPageFrom);
              }}
            >
              &gt;&gt;
            </a>
          </li>
        </ul>
      </nav>
    )
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;

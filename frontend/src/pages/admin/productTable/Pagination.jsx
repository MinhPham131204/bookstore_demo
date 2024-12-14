import React from "react";

const Pagination = ({  totalProducts, productsPerPage, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="flex justify-center items-center">
        {pageNumbers.map((page, number) => (
          <li key={number} className="px-4 py-2 border">
            <button onClick={() => paginate(page)} className={page === currentPage ? 'active' : ''}>
                {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
       <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-full bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
      >
        <i className="fa fa-chevron-left"></i>
      </button>

       {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-md ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          {page}
        </button>
      ))}

       <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-full bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
      >
        <i className="fa fa-chevron-right"></i>
      </button>
    </div>
  );
};

export default Pagination;

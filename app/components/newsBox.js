const NewsBox = ({ title, description, link }) => {
  return (
    <div className="flex items-center p-3 bg-white border border-blue-800  shadow-md">
       <div className="w-16 h-16 bg-gray-300 rounded-md flex-shrink-0 mr-3"></div>

       <div>
        <a href={link} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-black-600 hover:underline">
          {title}
        </a>
        <p className="text-sm text-gray-600">
          {description.length > 100 ? `${description.slice(0, 100)}...` : description}
        </p>
      </div>
    </div>
  );
};

export default NewsBox;

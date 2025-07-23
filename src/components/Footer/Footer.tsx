function Footer() {
  return (
    <footer className="bg-gray-1000 text-white py-8 mt-auto">
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <a
            href="https://rs.school/courses/reactjs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-4 hover:opacity-80 transition-opacity duration-200 group"
          >
            <div className="flex-shrink-0">
              <img
                src="/otabek996-REACT2025Q3/the-rolling-scopes-school-logo.svg"
                alt="The Rolling Scopes School Logo"
                className="h-8 w-auto"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div
                className="h-8 w-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm hidden"
                style={{ display: 'none' }}
              >
                RS
              </div>
            </div>

            <p className="text-lg font-medium group-hover:text-gray-300 transition-colors duration-200">
              The Rolling Scopes School
            </p>
          </a>

          <div className="text-center text-gray-400 text-sm border-t border-gray-700 pt-4 w-full">
            <p>&copy; {new Date().getFullYear()} React Course Project</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

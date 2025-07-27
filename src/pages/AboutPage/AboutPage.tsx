function AboutPage() {
  return (
    <section className="about-page">
      <h1>This is ABOUT Page</h1>
      <p className="py-2">Application author - It is me :)</p>
      <a
        href="https://github.com/Otabek996"
        target="_blank"
        rel="noopener noreferrer"
      >
        Otabek
      </a>
      <a
        href="https://rs.school"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-4 hover:opacity-80 transition-opacity duration-200 group"
      >
        <div className="flex-shrink-0">
          <div
            className="h-8 w-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm hidden"
            style={{ display: 'none' }}
          >
            RS
          </div>
        </div>

        <p className="font-medium group-hover:text-gray-300 transition-colors duration-200">
          The Rolling Scopes School
        </p>
      </a>
      <a
        href="https://rs.school/courses/reactjs"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-4 hover:opacity-80 transition-opacity duration-200 group"
      >
        <div className="flex-shrink-0">
          <div
            className="h-8 w-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm hidden"
            style={{ display: 'none' }}
          >
            RS
          </div>
        </div>

        <p className="font-medium group-hover:text-gray-300 transition-colors duration-200">
          React Course
        </p>
      </a>
    </section>
  );
}

export default AboutPage;

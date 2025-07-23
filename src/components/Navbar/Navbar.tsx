function Navbar() {
  const links = [
    {
      text: 'Home',
      link: '/otabek996-REACT2025Q3/',
    },
    {
      text: 'About',
      link: '/otabek996-REACT2025Q3/about',
    },
    {
      text: 'Characters',
      link: '/otabek996-REACT2025Q3/characters',
    },
  ];

  return (
    <div className="navbar">
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.link}>{link.text}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Navbar;

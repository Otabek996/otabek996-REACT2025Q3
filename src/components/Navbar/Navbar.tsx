import { NavLink } from 'react-router-dom';

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
    <div className="navbar fixed top-0 left-0 w-full">
      <div className="max-w-7xl mx-auto p-4">
        <ul className="flex space-x-6 py-2">
          {links.map((link, index) => (
            <li key={index} className="text-white">
              <NavLink to={link.link}>{link.text}</NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;

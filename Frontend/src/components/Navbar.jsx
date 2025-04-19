import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
      <nav className="bg-black shadow-lg p-4 text-white">
        <div className="flex justify-between items-center">
            <div className="text-2xl">
                <Link to='/'>HOME</Link>
            </div>
            <div className="flex space-x-4">
                <Link to='/gal4'>GAL1</Link>
                <Link to='/gal2'>GAL2</Link>
                <Link to='/gal3'>GAL3</Link>
                <Link to='/gal1'>GAL4</Link>
                <Link to='/team1'>TEAM1</Link>
            </div>
        </div>
      </nav>
  );
};

export default Navbar;

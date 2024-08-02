import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to="/" className="flex items-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white p-0">
      <div className="flex items-center">
      <img 
          src="/wecare.svg" 
          alt="wecare logo" 
          className="w-6 h-6 mr-2 text-indigo-500 dark:text-white"
        />
        <span className="text-indigo-500 dark:text-white">wecare</span>
      </div>
    </Link>
  );
}
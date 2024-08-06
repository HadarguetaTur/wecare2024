import PropTypes from 'prop-types';

const Spinner = ({ bgColor }) => {
  const colorClass = bgColor ? `bg-[${bgColor}]` : 'bg-[#50b5ff]';

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="flex space-x-2">
        <div className={`w-4 h-4 rounded-full ${colorClass} animate-bounce`} style={{ animationDelay: '-0.32s' }}></div>
        <div className={`w-4 h-4 rounded-full ${colorClass} animate-bounce`} style={{ animationDelay: '-0.16s' }}></div>
        <div className={`w-4 h-4 rounded-full ${colorClass} animate-bounce`} />
      </div>
    </div>
  );
};

Spinner.propTypes = {
  bgColor: PropTypes.string
};

export default Spinner;

/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa'; 
import { FaStar } from "react-icons/fa";


export default function ArticleCard({ post }) {


  const renderStars = (rating) => {
    const totalStars = 5;
    const filledStars = Math.round(rating); // Round the rating to the nearest whole number
    return Array.from({ length: totalStars }, (_, index) => (
      <FaStar
        key={index}
        className={`text-sm ${index < filledStars ? 'text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  }; 

  return (
    <div className='group relative border border-teal-500 hover:border-2 overflow-hidden rounded-lg transition-all'>
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.photo}
          alt='post cover'
          className='h-[200px] w-full object-cover group-hover:h-[180px] transition-all duration-300 z-20'
        />
      </Link>
      <div className='p-3 flex flex-col gap-2'>
        <p className='text-lg font-semibold line-clamp-2'>{post.title}</p>
        <span className='italic text-sm'>{post.category}</span>

        <div className='flex items-center gap-1 text-sm text-gray-500'>
          <FaEye />
          <span>{post.views} Views</span>
        </div>

    
        <div className='flex items-center gap-1 text-sm'>
          {renderStars(post.ratingsAverage)}
          <span className='ml-2 text-gray-500'>{post.ratingsAverage.toFixed(1)}</span>
        </div>

        <Link
          to={`/post/${post.slug}`}
          className='border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md mt-2'
        >
          Read article
        </Link>
      </div>
    </div>
  );
}

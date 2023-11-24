import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { useState } from 'react';
import QuoteModal from './QuoteModal';

const SingleQuoteCard = ({ quote }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl'>
      {/* <h4 className='my-2 text-gray-500'>{quote._id}</h4> */}
      <div className='flex justify-start items-center gap-x-2'>
        <PiBookOpenTextLight className='text-red-300 text-2xl' />
        <h2 className='my-1'>{quote.quote}</h2>
      </div>
      <div className='flex justify-start items-center gap-x-2'>
        <BiUserCircle className='text-red-300 text-2xl' />
        <h2 className='my-1'>{quote.author}</h2>
      </div>
      <div className='flex justify-between items-center gap-x-2 mt-4 p-4'>
        <BiShow
          className='text-3xl text-blue-800 hover:text-black cursor-pointer'
          onClick={() => setShowModal(true)}
        />
        <Link to={`/quotes/details/${quote._id}`}>
          <BsInfoCircle className='text-2xl text-green-800 hover:text-black' />
        </Link>
        <Link to={`/quotes/edit/${quote._id}`}>
          <AiOutlineEdit className='text-2xl text-yellow-600 hover:text-black' />
        </Link>
        <Link to={`/quotes/delete/${quote._id}`}>
          <MdOutlineDelete className='text-2xl text-red-600 hover:text-black' />
        </Link>
      </div>
      {showModal && (
        <QuoteModal quote={quote} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default SingleQuoteCard;
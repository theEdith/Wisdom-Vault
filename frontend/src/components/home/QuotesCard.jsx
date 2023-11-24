
import SingleQuoteCard from './SingleQuoteCard';

const QuotesCard = ({ quotes }) => {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {quotes.map((item) => (
        <SingleQuoteCard key={item._id} quote={item} />
      ))}
    </div>
  );
};

export default QuotesCard;
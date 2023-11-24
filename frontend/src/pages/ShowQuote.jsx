import React from "react";
import { useState, useEffect} from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowQuote = () => {
  const [quote, setQuote] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8080/quotes/${id}`)
      .then((response) => {
        setQuote(response.data);
       
        // console.log(quote)
        setLoading(false);
      })
      .catch((error) => {
        // console.log(error);
        setLoading(false);
      });
  }, [id]);


const handleNextClick = async () => {
    try {
      const response = await axios.get('https://wisdom-vault-server.vercel.app/quotes');
      const quotes = response.data.data;
    //   console.log(quotes)

      // Find the index of the quote with the given ID using a loop
      let foundIndex = -1;
      for (let i = 0; i < quotes.length; i++) {
        if (quotes[i]._id === id) {
          foundIndex = i;
          break;
        }
      }

      if (foundIndex !== -1 && foundIndex < quotes.length - 1) {
        const nextIndex = foundIndex + 1;
        const nextQuoteId = quotes[nextIndex]._id;
        // Navigate to the next quote's page
        navigate(`/quotes/details/${nextQuoteId}`);
      }
    } catch (error) {
      console.error('Error fetching quotes:', error);
    }
  };

  
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Show Quote</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Id</span>
            <span>{quote._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Title</span>
            <span>{quote.quote}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Author</span>
            <span>{quote.author}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Create Time</span>
            <span>{new Date(quote.createdAt).toString()}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Last Update Time</span>
            <span>{quote.updatedAt}</span>
          </div>
        </div>
      )}

      <div>
        <button className="bg-sky-800 text-white my-4 px-4 py-1 rounded-lg w-fit" onClick={handleNextClick}>
          Next Quote
        </button>
      </div>
    </div>
  );
};

export default ShowQuote;

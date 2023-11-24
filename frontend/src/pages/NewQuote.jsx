import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const NewQuote = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();

  const handleSaveQuote = () => {
    const data = {
      quote,
      author
    };
    setLoading(true);

    axios.post('https://wisdom-vault-server.vercel.app/quotes', data)
    .then(() => {
      setLoading(false);
      enqueueSnackbar("Quote Added Successfully", {variant: 'success'})
      navigate('/');
    })
    .catch((error) => {
      setLoading(false);
      enqueueSnackbar('Error',{variant:'error'});
    });
  }
  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Add Quote</h1>
      {
        loading? (<Spinner/>) : ('')
      }

      <div className='flex flex-col border-2 border-sky-400 rounded-xl p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Quote</label>
          <input
          type='text'
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'/>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input
          type='text'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'/>
        </div>
       

        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveQuote}>Save</button>
      </div>
    </div>
  )
}

export default NewQuote

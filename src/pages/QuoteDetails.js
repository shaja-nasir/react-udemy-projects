import React, { Fragment, useEffect } from 'react'
import { Link, Route, useParams, useRouteMatch } from 'react-router-dom';
import Comments from '../components/comments/Comments';
import HighlightedQuotes from '../components/quotes/HighlightedQuotes';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../library/api';

const DUMMY_QUOTES = [
    { id: 'q1', author: 'Max', text: 'Learning React is fun!' },
    { id: 'q2', author: 'Maximilian', text: 'Learning React is great!' },
  ];


const QuoteDetails = () => {
    const match = useRouteMatch();
    const params = useParams();
    const { quoteId } = params;

   const { sendRequest, status, data: loadedQuote, error } = useHttp(
    getSingleQuote,
    true
  );

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === 'pending') {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className='centered'>{error}</p>;
  }

  if (!loadedQuote.text) {
    return <p>No quote found!</p>;
  }
   

    return (
        <Fragment>
        <HighlightedQuotes text={loadedQuote.text} author={loadedQuote.author} />
        <Route path={match.path} exact>
          <div className='centered'>
            <Link className='btn--flat' to={`${match.url}/comments`}>
              Load Comments
            </Link>
          </div>
        </Route>
        <Route path={`${match.path}/comments`}>
          <Comments />
        </Route>
      </Fragment>
    )
}

export default QuoteDetails
import { graphql, compose, withApollo } from 'react-apollo';
import DELETE_REVIEW from "../graphql/mutations/DELETE_REVIEW";
import UPDATE_REVIEW from "../graphql/mutations/UPDATE_REVIEW";
import ReviewForm from "../components/ReviewForm";
import SESSIONS from '../graphql/queries/SESSIONS';

const updateMutationOptions = {
  name: 'UpdateReview',
  options: () => ({
    refetchQueries: [{
      query: SESSIONS,
    }],
  }),
};

const queryOptions = {
    name: 'Reviews',
    options: () => ({
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
    }),
    props: ({Reviews: { reviews, loading, error }}) => ({
      reviews,
      loading,
      error
    }),
};

export default compose(
    withApollo,
    graphql(SESSIONS, queryOptions),
    graphql(DELETE_REVIEW, 'deleteReview'),
    graphql(UPDATE_REVIEW, updateMutationOptions),
)(ReviewForm);
  
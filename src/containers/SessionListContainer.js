import { graphql, compose, withApollo } from 'react-apollo';
import SESSIONS from "../graphql/queries/SESSIONS"
import SessionList from "../components/SessionList/index";

const queryOptions = {
    name: 'Sessions',
    options: () => ({
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
    }),
    props: ({Sessions:{ tastingSessions, loading, error }}) => ({
      tastingSessions,
      loading,
      error
    }),
};


export default compose(
    withApollo,
    graphql(SESSIONS, queryOptions),
)(SessionList);
  
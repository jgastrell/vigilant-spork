import gql from "graphql-tag";
const SESSIONS = gql`
  query Sessions {
    tastingSessions {
      id
      createdAt
      wines {
        id
        name
      }
      wineTasters {
        id
        name
      }
      reviews {
        id
        wineTaster {
          name
        }
        wine {
          name
        }
        score
        yearPredict
        pricePredict
        tastingNotes
        pairing
      }
    }
  }
`;

export default SESSIONS;
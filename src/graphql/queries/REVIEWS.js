import gql from "graphql-tag";
const REVIEWS = gql`
  query Reviews {
    reviews {
        id
        wine {
            name
        }
        wineTaster {
            name
        }
        score
        yearPredict
        pricePredict
        tastingNotes
        pairing
    }
}
`;

export default REVIEWS;
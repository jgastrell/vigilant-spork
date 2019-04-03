import gql from "graphql-tag";
const UPDATE_REVIEW = gql`
mutation updateReview(
  $review: ReviewUpdateInput!
  $id: ID!
) {
  updateReview(
    data: $review
    where: { id: $id }
  ) {
    id
    wine {
      name
    }
    wineTaster {
      name
    }
    score
    tastingNotes
    yearPredict
    pricePredict
    pairing
  }
}

`;

export default UPDATE_REVIEW;
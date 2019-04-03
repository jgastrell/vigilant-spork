import gql from "graphql-tag";
const DELETE_REVIEW = gql`
mutation deleteReview($id: ID){
    deleteReview (where:{id:$id}) {
        id
    }
}
`;

export default DELETE_REVIEW;
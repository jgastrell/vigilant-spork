import gql from "graphql-tag";
const DELETE_SESSION = gql`
mutation deleteTastingSession($id: ID){
    deleteManyReviews (where: {tastingSession: {id:$id}})
    {
        count
    }
    deleteTastingSession (where:{id:$id}) {
        id
    }
}
`;

export default DELETE_SESSION;
import gql from "graphql-tag";
const UPDATE_SESSION_REMOVE_WINE_OR_TASTER = gql`
  mutation updateTastingSession(
    $sessionWineIDs: [WineWhereUniqueInput!]
    $sessionWineTastersIDs: [WineTasterWhereUniqueInput!]
    $sessionID: ID!
  ) {
    updateTastingSession(
      where: { id: $sessionID }
      data: {
        wines: { disconnect: $sessionWineIDs }
        wineTasters: { disconnect: $sessionWineTastersIDs }
      }
    ) {
      id
    }
  }
`;

export default UPDATE_SESSION_REMOVE_WINE_OR_TASTER;
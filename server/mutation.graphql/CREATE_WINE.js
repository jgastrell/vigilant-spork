const gql =  require('graphql-tag');
const CREATE_WINE = gql`
  mutation createWine(
    $name: String!
    $grapes: [WineGrapes!]
    $winery: String
    $year: Int
    $alcohol: Float
    $price: Float
    $image: String
    $size: String
    $color: String
  ) {
    createWine(
      data: {
        name: $name
        grapes: { set: $grapes }
        winery: $winery
        year: $year
        alcohol: $alcohol
        price: $price
        image: $image
        color: $color
        size: $size
      }
    ) {
      id
      name
      grapes
      winery
      year
      alcohol
      price
    }
  }
`
module.exports = CREATE_WINE;

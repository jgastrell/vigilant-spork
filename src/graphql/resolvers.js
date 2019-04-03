import LOCAL_TASTING_SESSION from "./queries/LOCAL_TASTING_SESSION";

export default {
  Mutation: {
    addWineTaster: (_obj, args, { cache }) => {
      const query = LOCAL_TASTING_SESSION;
      const {
        sessionID,
        sessionWines,
        sessionWineTasters,
        sessionReviews,
        sessionCreatedAt
      } = cache.readQuery({ query });
      const { wineTaster } = args;
      if (
        !sessionWineTasters.filter(e => e.name === wineTaster.name).length > 0
      ) {
        const updatedWines = sessionWineTasters
          ? sessionWineTasters.concat(wineTaster)
          : [wineTaster];

        cache.writeQuery({
          query,
          data: {
            sessionID,
            sessionWines,
            sessionWineTasters: updatedWines,
            sessionReviews,
            sessionCreatedAt,
          },
        });
      }
      return null;
    },
    addWine: (_obj, args, { cache }) => {
      const query = LOCAL_TASTING_SESSION;
      const {
        sessionID,
        sessionWines,
        sessionWineTasters,
        sessionReviews,
        sessionCreatedAt,
      } = cache.readQuery({ query });
      const { wine } = args;

      if (!sessionWines.filter(e => e.id === wine.id).length > 0) {
        const updatedWines = sessionWines ? sessionWines.concat(wine) : [wine];

        cache.writeQuery({
          query,
          data: {
            sessionID,
            sessionWines: updatedWines,
            sessionWineTasters,
            sessionReviews,
            sessionCreatedAt,
          },
        });
      }
      return null;
    },
  },
};

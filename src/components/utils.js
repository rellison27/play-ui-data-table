import moment from "moment";
import { filter } from "lodash";

export const filterPublishedGames = games =>
  filter(games, ({ publishers }) => publishers[0].broadcasts[0].headline);

export const filterStartTime = (association, query) =>
  filter(association, ({ publishers }) =>
    moment(publishers[0].broadcasts[0].start_time)
      .format("LLL")
      .includes(query)
  );

export const formatter = value => moment(value).format("LLL");

import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import UtilsMoment from "@date-io/moment";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import Row from "./Row";
import Head from "./Head";
import { filterPublishedGames, filterStartTime, formatter } from "./utils";

export default class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      georgiaAssociation: {},
      tab: "GHSA",
      texasAssociation: {},
      query: ""
    };
  }
  componentDidMount() {
    fetch(
      "https://search-api.nfhsnetwork.com/search/events/upcoming?state_association_key=18bad24aaa&size=50"
    )
      .then(res => res.json())
      .then(({ items }) => {
        const filtered = filterPublishedGames(items);
        this.setState({ georgiaAssociation: filtered });
      });
    fetch(
      "https://search-api.nfhsnetwork.com/search/events/upcoming?state_association_key=542bc38f95&size=50"
    )
      .then(res => res.json())
      .then(({ items }) => {
        const filtered = filterPublishedGames(items);
        this.setState({ texasAssociation: filtered });
      });
  }

  handleSelectChange = ({ target: { value } }) => this.setState({ tab: value });

  handleTextFieldChange = value =>
    this.setState({ query: moment(value).format("LL") });

  render() {
    const { georgiaAssociation, tab, texasAssociation, query } = this.state;
    return (
      <div>
        <Paper className="container">
          <nav style={{ textAlign: "center" }}>
            <h3 className="nav" style={{ display: "inline" }}>
              State Association:{" "}
            </h3>
            <Select value={tab} onChange={this.handleSelectChange}>
              <MenuItem value={"GHSA"}>GHSA</MenuItem>
              <MenuItem value={"THSA"}>THSA</MenuItem>
            </Select>
            <h3
              className="nav"
              style={{ display: "inline", paddingLeft: 30, paddingRight: 13 }}
            >
              Start Time:
            </h3>
            <MuiPickersUtilsProvider utils={UtilsMoment}>
              <DatePicker value={query} onChange={this.handleTextFieldChange} />
            </MuiPickersUtilsProvider>
          </nav>
          <Table>
            <Head />
            <TableBody>
              {tab === "GHSA" &&
                filterStartTime(georgiaAssociation, query).map(
                  ({ key, publishers }) => (
                    <Row
                      key={key}
                      id={key}
                      headline={publishers[0].broadcasts[0].headline}
                      subHeadline={publishers[0].broadcasts[0].subheadline}
                      startTime={formatter(
                        publishers[0].broadcasts[0].start_time
                      )}
                    />
                  )
                )}
              {tab === "THSA" &&
                filterStartTime(texasAssociation, query).map(
                  ({ key, publishers }) => (
                    <Row
                      key={key}
                      id={key}
                      headline={publishers[0].broadcasts[0].headline}
                      subHeadline={publishers[0].broadcasts[0].subheadline}
                      startTime={formatter(
                        publishers[0].broadcasts[0].start_time
                      )}
                    />
                  )
                )}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

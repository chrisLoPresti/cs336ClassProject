import React from "react";
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
  Button,
  Grid
} from "@material-ui/core";
import PropTypes from "prop-types";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "./pattern.css";

const queries = [
  {
    title: "No Bars Can Have Transactions When They Are Closed",
    description:
      "Run this query to make sure that no bars have transactions when they are closed. If true, we will return 1, if false we will return 0. **This could take a minute or so.",
    req: {
      query:
        "SELECT NOT EXISTS (SELECT * FROM Bills b, Operates o WHERE b.date = o.date AND b.bar = o.bar AND b.time < o.start AND b.time > o.end) AS no_bills_when_bar_is_closed;"
    }
  },
  {
    title: "Drinkers Only Frequent Bars In The Same State They Live In",
    description:
      "Run this query to check to make sure drinkers only frequent bars within the same state they live. If true we will return 1, if not we will return 0. **This could take a minute or so.",
    req: {
      query:
        "SELECT NOT EXISTS (SELECT * FROM Frequents f, Bar b, Drinker d WHERE d.name = f.drinker AND f.bar = b.name AND b.state <> d.state) AS No_Out_of_State_Drinkers;"
    }
  },
  {
    title: "Beer Price Pattern Across Bars",
    description:
      "For every two beers, b1 and b2, different bars may charge differently for b1 and b2 but b1 should either be less expensive than b2 in ALL bars or more expensive than b2 in ALL bars. If true we will return 1, if not we will return 0. **This could take a minute or so.",
    req: {
      query:
        "SELECT NOT EXISTS (SELECT * FROM (SELECT s1.beername AS beer1, s1.barname AS bar, s1.price AS price1, s2.beername AS beer2, s2.price AS price2 FROM SellsBeer s1, SellsBeer s2 WHERE s1.beername <> s2.beername AND s1.barname = s2.barname) s, (SELECT s3.beername AS beer3, s3.barname AS bar, s3.price AS price3,s4.beername AS beer4, s4.price AS price4 FROM SellsBeer s3, SellsBeer s4 WHERE s3.beername <> s4.beername AND s3.barname = s4.barname) s5 WHERE s.bar <> s5.bar AND s.beer1 = s5.beer3 AND s.beer2 = s5.beer4 AND ((s.price1 <= s.price2 AND s5.price3 > s5.price4) OR (s.price1 >= s.price2 AND s5.price3 < s5.price4))) AS comparing_beer_prices;"
    }
  },
  {
    title: "Bars Cant Sell More Than Whats In Stock",
    description:
      "Run this query to make sure bars cannot sell more beers of a specific brand than it has in its inventory. If true we will return 1, if not we will return 0. **This could take a minute or so.",
    req: {
      query:
        'SELECT NOT EXISTS (SELECT * FROM (SELECT SUM(t.quantity) AS quantity_in_transactions, b1.start_quantity FROM (SELECT b.bill_id AS bill_id, i.beer AS beer, b.bar AS bar, b.date AS date, i.startquantity AS start_quantity FROM Inventory i, Bills b WHERE i.bar = b.bar AND i.date = b.date) b1, Transactions t WHERE t.type = "beer" AND b1.bill_id = t.bill_id AND t.item = b1.beer GROUP BY b1.beer, b1.bar, b1.date) c WHERE c.start_quantity < c.quantity_in_transactions) AS not_selling_more_than_have;'
    }
  },
  {
    title: "Bartenders Can Only Work One Shift A Day",
    description:
      "Run this query to make sure that no bartender has more then one shift a day. If true we will return 1, if not we will return 0. **This query will most likely time out...We have a ton of tuples. It should pass in MySQL workbench. Heroku only allows for a 30 second call until timeout",
    req: {
      query:
        "SELECT NOT EXISTS( SELECT COUNT(*) AS number_of_shifts_a_day FROM Shifts s GROUP BY s.bartender, s.date HAVING number_of_shifts_a_day <> 1) AS no_bartender_has_more_than_one_shift_a_day;"
    }
  }
];

class ControlledExpansionPanels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: null
    };
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  render() {
    const { expanded } = this.state;

    return (
      <div id="pattern-container">
        {queries.map(item => (
          <ExpansionPanel
            className="pannel"
            key={item.title}
            expanded={expanded === `${item.title}`}
            onChange={this.handleChange(`${item.title}`)}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{item.title}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container>
                <Grid xs={12} sm={6}>
                  <Typography className="pattern-text">
                    {item.description}
                  </Typography>
                  <div className="pattern-button-container">
                    {this.props.loadingQuery && (
                      <img
                        src={require("../../images/spinner.gif")}
                        alt="loading..."
                        style={{
                          width: "100px",
                          margin: "auto",
                          display: "block"
                        }}
                      />
                    )}
                    <Button
                      className="pattern-button"
                      onClick={() => this.props.runPattern(item.req)}
                    >
                      Run Query
                    </Button>
                  </div>
                </Grid>
                <Grid xs={12} sm={6}>
                  <Typography className="pattern-text">
                    {item.req.query}
                  </Typography>
                </Grid>
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </div>
    );
  }
}
ControlledExpansionPanels.propTypes = {
  runPattern: PropTypes.func.isRequired,
  loadingQuery: PropTypes.bool.isRequired
};
export default ControlledExpansionPanels;

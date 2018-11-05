import React, { Fragment } from "react";
import PropTypes from "prop-types";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import "./transactions.css";

class ControlledExpansionPanels extends React.Component {
  state = {
    expanded: null
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  generateDate = data => {
    var names = [];
    for (var x = 0; x < this.props.transactions.length; ++x) {
      if (names.includes(this.props.transactions[x].bar)) {
        continue;
      }
      var arr = [];
      for (var j = x; j < this.props.transactions.length; ++j) {
        if (this.props.transactions[x].bar === this.props.transactions[j].bar) {
          arr.push(this.props.transactions[j]);
        }
      }
      names.push(this.props.transactions[x].bar);
      data.push(arr);
    }
  };

  render() {
    const { expanded } = this.state;
    var data = [];

    this.generateDate(data);

    return (
      <div id="expansion-container">
        {data.map(list => (
          <ExpansionPanel
            className="expansion-pannel"
            expanded={expanded === `${list[0].bar}${list[0].time}`}
            onChange={this.handleChange(`${list[0].bar}${list[0].time}`)}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{list[0].bar}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className="expansion-detail">
              <Grid id="expainsion-text-container" container>
                <Grid item xs={3}>
                  <Typography className="expansion-text-title">
                    Date:
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography className="expansion-text-title">
                    Item:
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography className="expansion-text-title">
                    Amnt:
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography className="expansion-text-title">
                    Time:
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography className="expansion-text-title">
                    Price:
                  </Typography>
                </Grid>
                {list.map(item => (
                  <Fragment>
                    <Grid item xs={3}>
                      <Typography className="expansion-text">
                        {item.date}
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography className="expansion-text">
                        {item.item}
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography className="expansion-text">
                        {item.quantity}
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography className="expansion-text">
                        {item.time}
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography className="expansion-text">
                        {item.total_item_price}
                      </Typography>
                    </Grid>
                  </Fragment>
                ))}
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </div>
    );
  }
}

ControlledExpansionPanels.propTypes = {
  transactions: PropTypes.object.isRequired
};

ControlledExpansionPanels.defaultProps = {
  transactions: []
};

export default ControlledExpansionPanels;

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit * 2
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  }
});

class ControlledOpenSelect extends React.Component {
  state = {
    type: "",
    open: false
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    const splitResult = event.target.value.split("-");
    this.props.changeOrder(splitResult[0], splitResult[1])();
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { classes } = this.props;

    return (
      <form
        autoComplete="off"
        style={{
          margin: "12px"
        }}
      >
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="demo-controlled-open-select">
            Sort By:
          </InputLabel>
          <Select
            open={this.state.open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={this.state.type}
            onChange={this.handleChange}
            inputProps={{
              name: "type",
              id: "demo-controlled-open-select"
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"barname-ascending"}>Barname-Ascending</MenuItem>
            <MenuItem value={"barname-descending"}>Barname-Descending</MenuItem>
            <MenuItem value={"foodname-ascending"}>Foodname-Ascending</MenuItem>
            <MenuItem value={"foodname-descending"}>
              Foodname-Descending
            </MenuItem>
            <MenuItem value={"price-ascending"}>Price-Ascending</MenuItem>
            <MenuItem value={"price-descending"}>Price-Descending</MenuItem>
          </Select>
        </FormControl>
      </form>
    );
  }
}

ControlledOpenSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  changeOrder: PropTypes.func.isRequired
};

export default withStyles(styles)(ControlledOpenSelect);

import React from "react";
import {
  Typography,
  Button,
  Modal,
  Paper,
  TextField,
  Grid
} from "@material-ui/core";
import PropTypes from "prop-types";

class modaldelete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: this.props.open,
      bar: "",
      bartender: "",
      date: "",
      day: "",
      start: "",
      end: ""
    };
  }
  handleCloseModal = () => {
    this.setState({ openModal: false });
    this.props.doneWithRequest();
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  processAction = () => {
    this.props.handleUpdate(
      this.state.bar ? this.state.bar : this.props.row.bar,
      this.state.bartender ? this.state.bartender : this.props.row.bartender,
      this.state.day ? this.state.day : this.props.row.day,
      this.state.start ? this.state.start : this.props.row.start,
      this.state.end ? this.state.end : this.props.row.end,
      this.state.date ? this.state.date : this.props.row.date,
      this.props.row.bartender,
      this.props.row.bar,
      this.props.row.date
    );
    this.props.doneWithRequest();
    this.handleCloseModal();
  };

  render() {
    return (
      <Modal
        id="modal"
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.state.openModal}
        onClose={this.handleCloseModal}
      >
        <Paper id="modal-content-mod-big2">
          <Typography id="modal-title-mod">Are You Sure?</Typography>
          <Typography id="simple-modal-header-mod">
            Lets update this row in the Shifts Table
          </Typography>
          <Grid container>
            <Grid item xs={12}>
              <TextField
                className="modal-text-insert"
                label={this.props.row.bar}
                value={this.state.bar}
                onChange={this.handleChange("bar")}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="modal-text-insert"
                label={this.props.row.bartender}
                value={this.state.bartender}
                onChange={this.handleChange("bartender")}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="modal-text-insert"
                label={this.props.row.date}
                value={this.state.date}
                type="date"
                onChange={this.handleChange("date")}
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="modal-text-insert"
                label={this.props.row.day}
                value={this.state.day}
                onChange={this.handleChange("day")}
                margin="normal"
              />
            </Grid>{" "}
            <Grid item xs={12}>
              <TextField
                className="modal-text-insert"
                label={this.props.row.start}
                value={this.state.start}
                onChange={this.handleChange("start")}
                margin="normal"
              />
            </Grid>{" "}
            <Grid item xs={12}>
              <TextField
                className="modal-text-insert"
                label={this.props.row.end}
                value={this.state.end}
                onChange={this.handleChange("end")}
                margin="normal"
              />
            </Grid>
          </Grid>
          <Typography id="simple-modal-description-mod">
            You can either cancel and select a new operation or go ahead and
            update this row into the Shifts table.
          </Typography>
          <div id="modal-button-container-mod">
            <Button
              id="cancel-button-mod"
              onClick={() => this.handleCloseModal()}
            >
              Cancel
            </Button>
            <Button
              id="action-button-insert-mod"
              onClick={() => this.processAction()}
            >
              Update
            </Button>
          </div>
        </Paper>
      </Modal>
    );
  }
}

modaldelete.propTypes = {
  row: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  doneWithRequest: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default modaldelete;

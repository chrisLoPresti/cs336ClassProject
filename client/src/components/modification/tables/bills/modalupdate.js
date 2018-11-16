import React from "react";
import {
  Typography,
  Button,
  Modal,
  Paper,
  Grid,
  TextField
} from "@material-ui/core";
import PropTypes from "prop-types";

class modaldelete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: this.props.open,
      tip: 0,
      result: 0
    };
  }
  handleCloseModal = () => {
    this.setState({ openModal: false });
    this.props.doneWithRequest();
  };

  handleChange = name => event => {
    this.setState(
      {
        [name]: event.target.value
      },
      () => this.calculateTotal()
    );
  };

  calculateTotal = () => {
    let addition;
    if (this.state.tip === 0) {
      this.setState({ result: this.props.row.total_price });
      return;
    }

    let input = this.state.tip;
    let data = Number(this.props.row.tip);
    let total = Number(this.props.row.total_price);
    if (input < data) {
      addition = data - input;
      this.setState({
        result: total - addition
      });
      return;
    } else if (input > data) {
      addition = input - data;
      this.setState({
        result: total + addition
      });
      return;
    }
    this.setState({ result: total });
  };

  processAction = () => {
    this.props.handleUpdate(
      this.props.row.bar,
      this.props.row.bartender,
      this.props.row.bill_id,
      this.props.row.date,
      this.props.row.day,
      this.props.row.drinker,
      this.props.row.items_price,
      this.props.row.tax_price,
      this.props.row.time,
      this.state.tip ? this.state.tip : this.props.row.tip,
      this.state.result,
      this.props.row.bill_id
    );

    this.props.doneWithRequest();
    this.handleCloseModal();
  };

  handleChangePicker = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
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
        <Paper id="modal-content-mod-big">
          <Typography id="modal-title-mod">Are You Sure?</Typography>
          <Typography id="simple-modal-header-mod">
            Lets update this row in the Operates Table
          </Typography>
          <Typography id="simple-modal-description-mod">
            You can only modify the tip you leave on a bill. You can delete the
            bill using our delete operation or you can edit a bill by adding
            transactions or edditing existing transactiosn.
          </Typography>
          <Grid container>
            <Grid item xs={12}>
              <TextField
                className="modal-text-insert"
                type="number"
                label={this.props.row.tip}
                value={this.state.tip === 0 ? "" : this.state.tip}
                onChange={this.handleChange("tip")}
                margin="normal"
              />
            </Grid>
          </Grid>
          <Typography id="simple-modal-description-mod">
            You can either cancel and select a new operation or go ahead and
            update this row into the Operates table.
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

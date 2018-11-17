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
      quantity: 0
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
    let price = 0;
    let good = false;
    var i = 0;
    for (i = 0; i < this.props.prices.beer.length; i++) {
      if (this.props.prices.beer[i].beername === this.props.row.item) {
        price = this.props.prices.beer[i].price;
        good = true;
        break;
      }
    }
    if (!good) {
      for (i = 0; i < this.props.prices.food.length; i++) {
        if (this.props.prices.food[i].foodname === this.props.row.item) {
          price = this.props.prices.food[i].price;
          good = true;
          break;
        }
      }
    }
    if (!good) {
      this.setState({
        warning: `${
          this.props.row.item
        } no lenger exists in our database, so we can not update this transaction. Sorry! But you can delete it...`
      });
      return;
    }
    this.props.handleUpdate(
      this.props.row.bill_id,
      this.state.quantity ? this.state.quantity : this.props.row.quantity,
      this.props.row.item,
      this.props.row.type,
      this.state.quantity ? this.state.quantity * price : this.props.row.price,
      this.props.row.bill_id,
      this.props.row.item
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
        <Paper id="modal-content-mod-big2">
          <Typography id="modal-title-mod">Are You Sure?</Typography>
          <Typography id="simple-modal-header-mod">
            Lets update this row in the Transactions Table. You can only update
            the quantity of the item in the transaction, the prices will change
            accordingly.
          </Typography>
          <Grid container>
            <Grid item xs={12}>
              {this.state.warning && (
                <Typography
                  style={{ margin: "20px", color: "red", textAlign: "center" }}
                >
                  {this.state.warning}
                </Typography>
              )}
              <TextField
                className="modal-text-insert"
                label="Quantity"
                value={this.state.quantity === 0 ? "" : this.state.quantity}
                onChange={this.handleChange("quantity")}
                margin="normal"
                type="number"
              />
            </Grid>
          </Grid>
          <Typography id="simple-modal-description-mod">
            You can either cancel and select a new operation or go ahead and
            update this row into the Transaction table.
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
  open: PropTypes.bool.isRequired,
  prices: PropTypes.array.isRequired
};

export default modaldelete;

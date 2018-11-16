import React from "react";
import {
  Typography,
  Button,
  Modal,
  Paper,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Grid,
  TextField
} from "@material-ui/core";
import PropTypes from "prop-types";

class modaldelete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: this.props.open,
      bill_id: "",
      item: "",
      price: 0,
      quantity: 0,
      type: "",
      error: false,
      emptyBillId: false,
      emptyQuantity: false
    };
  }
  handleCloseModal = () => {
    this.props.doneWithRequest();
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleChangePicker = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  processAction = () => {
    if (!this.state.bill_id) {
      this.setState({ emptyBillId: true, emptyQuantity: false, error: false });
      return;
    }
    if (!this.state.item) {
      this.setState({ error: true, emptyBillId: false, emptyQuantity: false });
      return;
    }
    if (!this.state.quantity || this.state.quantity === 0) {
      this.setState({ error: false, emptyBillId: false, emptyQuantity: true });
      return;
    }
    let type = "";
    let price = 0;
    let good = false;
    var i = 0;
    for (i = 0; i < this.props.prices.beer.length; i++) {
      if (this.props.prices.beer[i].beername === this.state.item) {
        type = "beer";
        price = this.props.prices.beer[i].price;
        good = true;
        break;
      }
    }
    if (!good) {
      for (i = 0; i < this.props.prices.food.length; i++) {
        if (this.props.prices.food[i].foodname === this.state.item) {
          type = "food";
          price = this.props.prices.food[i].price;
          good = true;
          break;
        }
      }
    }

    this.props.handleInsert(
      this.state.bill_id,
      this.state.quantity,
      this.state.item,
      type,
      price * this.state.quantity,
      this.state.bill_id,
      this.state.item
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
        <Paper id="modal-content-mod-big">
          <Typography id="modal-title-mod">Are You Sure?</Typography>
          <Typography id="simple-modal-header-mod">
            Lets insert this row in to the Operates Table. First you must type a
            valid Bill ID, then press "Load Menu".
          </Typography>
          <Grid container>
            <Grid item xs={12}>
              <TextField
                className="modal-text-insert"
                label="Bill ID"
                value={this.state.bill_id}
                onChange={this.handleChange("bill_id")}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Button
                style={{ backgroundColor: "#303030", color: "whitesmoke" }}
                onClick={() => {
                  this.props.loadItems(this.state.bill_id);
                  this.setState({ error: false });
                }}
              >
                Load Menu
              </Button>
              {this.state.emptyQuantity && (
                <Typography
                  style={{ color: "red", margin: "20px" }}
                  id="simple-modal-header-mod"
                >
                  Please enter a valid quantity above 0
                </Typography>
              )}
              {this.state.emptyBillId && (
                <Typography
                  style={{ color: "red", margin: "20px" }}
                  id="simple-modal-header-mod"
                >
                  Please type a bill id and load the menu
                </Typography>
              )}
              {(Object.keys(this.props.errors.error).length > 0 ||
                this.state.error) &&
                this.state.bill_id && (
                  <Typography
                    style={{ color: "red", margin: "20px" }}
                    id="simple-modal-header-mod"
                  >
                    Invalid Bill ID or no item selected. Check your bill id and
                    load the menu to select an item.
                  </Typography>
                )}
            </Grid>
            {this.props.prices && Object.keys(this.props.prices).length > 0 && (
              <Grid item xs={12}>
                <FormControl className="modal-text-insert picker">
                  <InputLabel>Select Item</InputLabel>
                  <Select
                    className="selecter"
                    value={this.state.item}
                    inputProps={{
                      name: "item"
                    }}
                    onChange={this.handleChangePicker}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem disabled value="Beer">
                      Beer
                    </MenuItem>
                    {this.props.prices.beer.map(beer => (
                      <MenuItem key={beer.beername} value={beer.beername}>
                        {beer.beername}
                      </MenuItem>
                    ))}
                    <MenuItem disabled value="Food">
                      Food
                    </MenuItem>
                    {this.props.prices.food.map(food => (
                      <MenuItem key={food.foodname} value={food.foodname}>
                        {food.foodname}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
            <Grid item xs={12}>
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
            insert this new row into the Operates table.
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
              Insert
            </Button>
          </div>
        </Paper>
      </Modal>
    );
  }
}

modaldelete.propTypes = {
  handleInsert: PropTypes.func.isRequired,
  doneWithRequest: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  prices: PropTypes.array.isRequired,
  loadItems: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

export default modaldelete;

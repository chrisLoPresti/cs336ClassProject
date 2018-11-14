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
      barname: "",
      foodname: "",
      price: ""
    };
  }
  handleCloseModal = () => {
    this.setState({ openModal: false, badQuery: "" });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  processAction = () => {
    this.props.handleInsert(
      this.state.barname,
      this.state.foodname,
      this.state.price
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
        <Paper id="modal-content-mod">
          <Typography id="modal-title-mod">Are You Sure?</Typography>
          <Typography id="simple-modal-header-mod">
            Lets insert this row in to the SellsFood Table
          </Typography>
          <Grid container>
            <Grid item xs={12}>
              <TextField
                className="modal-text-insert"
                label="Barname"
                value={this.state.barname}
                onChange={this.handleChange("barname")}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="modal-text-insert"
                label="Foodname"
                value={this.state.foodname}
                onChange={this.handleChange("foodname")}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="modal-text-insert"
                label="Price"
                value={this.state.price}
                onChange={this.handleChange("price")}
                margin="normal"
              />
            </Grid>
          </Grid>
          <Typography id="simple-modal-description-mod">
            You can either cancel and select a new operation or go ahead and
            insert this new row into the SellsFood table.
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
  open: PropTypes.bool.isRequired
};

export default modaldelete;

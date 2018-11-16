import React from "react";
import { Typography, Button, Modal, Paper } from "@material-ui/core";
import PropTypes from "prop-types";

class modaldelete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: this.props.open
    };
  }
  handleCloseModal = () => {
    this.props.doneWithRequest();
  };

  processAction = () => {
    this.props.handleDelete(
      this.props.row.bar,
      this.props.row.bartender,
      this.props.row.bill_id,
      this.props.row.date,
      this.props.row.day,
      this.props.row.drinker,
      this.props.row.items_price,
      this.props.row.tax_price,
      this.props.row.time,
      this.props.row.tip,
      this.props.row.total_price,
      this.props.row.bill_id
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
            Do you wish to delete this row from the database?
          </Typography>
          <Typography id="simple-modal-description-mod">
            Bill Id: {this.props.row.bill_id}
          </Typography>
          <Typography id="simple-modal-description-mod">
            Bartender: {this.props.row.bartender}
          </Typography>
          <Typography id="simple-modal-description-mod">
            Drinker: {this.props.row.drinker}
          </Typography>
          <Typography id="simple-modal-description-mod">
            Date: {this.props.row.date}
          </Typography>
          <Typography id="simple-modal-description-mod">
            Total: {this.props.row.total_price}
          </Typography>
          <Typography id="simple-modal-description-mod">
            Once you delete this information there is no getting it back. Please
            make sure this is what you want to do, as it will permanently be
            removed from the Bills table, **removing all transactions
            associated**.
          </Typography>
          <div id="modal-button-container-mod">
            <Button
              id="cancel-button-mod"
              onClick={() => this.handleCloseModal()}
            >
              Cancel
            </Button>
            <Button
              id="action-button-delete-mod"
              onClick={() => this.processAction()}
            >
              Delete
            </Button>
          </div>
        </Paper>
      </Modal>
    );
  }
}

modaldelete.propTypes = {
  row: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  doneWithRequest: PropTypes.func.isRequired
};

export default modaldelete;

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
      this.props.row.beer,
      this.props.row.drinker,
      this.props.row.beer,
      this.props.row.drinker
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
            Do you wish to delete this row from the database?
          </Typography>
          <Typography id="simple-modal-description-mod">
            drinker: {this.props.row.drinker}
          </Typography>
          <Typography id="simple-modal-description-mod">
            beer: {this.props.row.beer}
          </Typography>
          <Typography id="simple-modal-description-mod">
            Once you delete this information there is no getting it back. Please
            make sure this is what you want to do, as it will permanently be
            removed from the Likes table.
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

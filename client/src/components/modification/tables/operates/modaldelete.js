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
    this.setState({ openModal: false });
  };

  processAction = () => {
    this.props.handleDelete(
      this.props.row.bar,
      this.props.row.date,
      this.props.row.day,
      this.props.row.end,
      this.props.row.start,
      this.props.row.bar
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
            bar: {this.props.row.bar}
          </Typography>
          <Typography id="simple-modal-description-mod">
            date: {this.props.row.date}
          </Typography>
          <Typography id="simple-modal-description-mod">
            day: {this.props.row.day}
          </Typography>
          <Typography id="simple-modal-description-mod">
            end: {this.props.row.end}
          </Typography>
          <Typography id="simple-modal-description-mod">
            start: {this.props.row.start}
          </Typography>
          <Typography id="simple-modal-description-mod">
            Once you delete this information there is no getting it back. Please
            make sure this is what you want to do, as it will permanently be
            removed from the Operates table.
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

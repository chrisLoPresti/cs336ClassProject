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
      name: ""
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

  processAction = () => {
    this.props.handleUpdate(
      this.state.name ? this.state.name : this.props.row.name,
      this.props.row.name
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
            Lets update this row in the BarFood Table
          </Typography>
          <Grid container>
            <Grid item xs={12}>
              <TextField
                className="modal-text-insert"
                label={this.props.row.name}
                value={this.state.name}
                onChange={this.handleChange("name")}
                margin="normal"
              />
            </Grid>
          </Grid>
          <Typography id="simple-modal-description-mod">
            You can either cancel and select a new operation or go ahead and
            update this row into the BarFood table.
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

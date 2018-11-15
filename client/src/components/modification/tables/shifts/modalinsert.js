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
      bar: "",
      bartender: "",
      date: "",
      day: "",
      end: "",
      start: ""
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
    this.props.handleInsert(
      this.state.bar,
      this.state.bartender,
      this.state.day,
      this.state.start,
      this.state.end,
      this.state.date,
      this.state.bartender,
      this.state.bar,
      this.state.date
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
            Lets insert this row in to the Shifts Table
          </Typography>
          <Grid container>
            <Grid item xs={12}>
              <TextField
                className="modal-text-insert"
                label="Bar"
                value={this.state.bar}
                onChange={this.handleChange("bar")}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="modal-text-insert"
                label="Bartender"
                value={this.state.bartender}
                onChange={this.handleChange("bartender")}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="modal-text-insert"
                label="Date"
                id="date"
                type="date"
                value={this.state.date}
                onChange={this.handleChange("date")}
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl className="modal-text-insert picker">
                <InputLabel>Select Day</InputLabel>
                <Select
                  className="selecter"
                  value={this.state.day}
                  inputProps={{
                    name: "day"
                  }}
                  onChange={this.handleChangePicker}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Monday">Monday</MenuItem>
                  <MenuItem value="Tuesday">Tuesday</MenuItem>
                  <MenuItem value="Wednesday">Wednesday</MenuItem>
                  <MenuItem value="Thursday">Thursday</MenuItem>
                  <MenuItem value="Friday">Friday</MenuItem>
                  <MenuItem value="Saturday">Saturday</MenuItem>
                  <MenuItem value="Sunday">Sunday</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl className="modal-text-insert picker">
                <InputLabel>Select Start</InputLabel>
                <Select
                  className="selecter"
                  value={this.state.start}
                  inputProps={{
                    name: "start"
                  }}
                  onChange={this.handleChangePicker}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="00:00">00:00</MenuItem>
                  <MenuItem value="01:00">01:00</MenuItem>
                  <MenuItem value="02:00">02:00</MenuItem>
                  <MenuItem value="03:00">03:00</MenuItem>
                  <MenuItem value="04:00">04:00</MenuItem>
                  <MenuItem value="05:00">05:00</MenuItem>
                  <MenuItem value="06:00">06:00</MenuItem>
                  <MenuItem value="07:00">07:00</MenuItem>
                  <MenuItem value="08:00">08:00</MenuItem>
                  <MenuItem value="09:00">09:00</MenuItem>
                  <MenuItem value="10:00">10:00</MenuItem>
                  <MenuItem value="11:00">11:00</MenuItem>
                  <MenuItem value="12:00">12:00</MenuItem>
                  <MenuItem value="13:00">13:00</MenuItem>
                  <MenuItem value="14:00">14:00</MenuItem>
                  <MenuItem value="15:00">15:00</MenuItem>
                  <MenuItem value="16:00">16:00</MenuItem>
                  <MenuItem value="17:00">17:00</MenuItem>
                  <MenuItem value="18:00">18:00</MenuItem>
                  <MenuItem value="19:00">19:00</MenuItem>
                  <MenuItem value="20:00">20:00</MenuItem>
                  <MenuItem value="21:00">21:00</MenuItem>
                  <MenuItem value="22:00">22:00</MenuItem>
                  <MenuItem value="23:00">23:00</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl className="modal-text-insert picker">
                <InputLabel>Select End</InputLabel>
                <Select
                  className="selecter"
                  value={this.state.end}
                  inputProps={{
                    name: "end"
                  }}
                  onChange={this.handleChangePicker}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="00:00">00:00</MenuItem>
                  <MenuItem value="01:00">01:00</MenuItem>
                  <MenuItem value="02:00">02:00</MenuItem>
                  <MenuItem value="03:00">03:00</MenuItem>
                  <MenuItem value="04:00">04:00</MenuItem>
                  <MenuItem value="05:00">05:00</MenuItem>
                  <MenuItem value="06:00">06:00</MenuItem>
                  <MenuItem value="07:00">07:00</MenuItem>
                  <MenuItem value="08:00">08:00</MenuItem>
                  <MenuItem value="09:00">09:00</MenuItem>
                  <MenuItem value="10:00">10:00</MenuItem>
                  <MenuItem value="11:00">11:00</MenuItem>
                  <MenuItem value="12:00">12:00</MenuItem>
                  <MenuItem value="13:00">13:00</MenuItem>
                  <MenuItem value="14:00">14:00</MenuItem>
                  <MenuItem value="15:00">15:00</MenuItem>
                  <MenuItem value="16:00">16:00</MenuItem>
                  <MenuItem value="17:00">17:00</MenuItem>
                  <MenuItem value="18:00">18:00</MenuItem>
                  <MenuItem value="19:00">19:00</MenuItem>
                  <MenuItem value="20:00">20:00</MenuItem>
                  <MenuItem value="21:00">21:00</MenuItem>
                  <MenuItem value="22:00">22:00</MenuItem>
                  <MenuItem value="23:00">23:00</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Typography id="simple-modal-description-mod">
            You can either cancel and select a new operation or go ahead and
            insert this new row into the Shifts table.
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

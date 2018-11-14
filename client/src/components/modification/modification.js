import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Typography,
  Grid,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button
} from "@material-ui/core";
import {
  clearModifications,
  getDrinkers,
  getBars,
  getBeers,
  getShifts,
  getBarfood,
  getDay,
  getFrequents,
  getLikes,
  getInventory,
  getOperates,
  getSellsbeer,
  getSellsfood,
  getBartenders,
  getBills,
  getTransactions
} from "../../actions/modificationActions";

//bars
import BarTable from "./tables/bar/bar";
import BarModalDelete from "./tables/bar/modaldelete";
import BarModalInsert from "./tables/bar/modalinsert";
import BarModalUpdate from "./tables/bar/modalupdate";

//barfood
import BarFoodTable from "./tables/barfood/barfood";
import BarFoodModalDelete from "./tables/barfood/modaldelete";
import BarFoodModalInsert from "./tables/barfood/modalinsert";
import BarFoodModalUpdate from "./tables/barfood/modalupdate";

//bartender
import BartenderTable from "./tables/bartender/bartender";
import BartenderModalDelete from "./tables/bartender/modaldelete";
import BartenderModalInsert from "./tables/bartender/modalinsert";
import BartenderModalUpdate from "./tables/bartender/modalupdate";

//beer
import BeerTable from "./tables/beer/beer";
import BeerModalDelete from "./tables/beer/modaldelete";
import BeerModalInsert from "./tables/beer/modalinsert";
import BeerModalUpdate from "./tables/beer/modalupdate";

//day
import DayTable from "./tables/day/day";
import DayModalDelete from "./tables/day/modaldelete";
import DayModalInsert from "./tables/day/modalinsert";
import DayModalUpdate from "./tables/day/modalupdate";

//drinker
import DrinkerTable from "./tables/drinker/drinker";
import DrinkerModalDelete from "./tables/drinker/modaldelete";
import DrinkerModalInsert from "./tables/drinker/modalinsert";
import DrinkerModalUpdate from "./tables/drinker/modalupdate";

//frequents
import FrequentsTable from "./tables/frequents/frequents";
import FrequentsModalDelete from "./tables/frequents/modaldelete";
import FrequentsModalInsert from "./tables/frequents/modalinsert";
import FrequentsModalUpdate from "./tables/frequents/modalupdate";

//likes
import LikesTable from "./tables/likes/likes";
import LikesModalDelete from "./tables/likes/modaldelete";
import LikesModalInsert from "./tables/likes/modalinsert";
import LikesModalUpdate from "./tables/likes/modalupdate";

//operates
import OperatesTable from "./tables/operates/operates";
import OperatesModalDelete from "./tables/operates/modaldelete";
import OperatesModalInsert from "./tables/operates/modalinsert";
import OperatesModalUpdate from "./tables/operates/modalupdate";

//sellsbeer
import SellsbeerTable from "./tables/sellsbeer/sellsbeer";
import SellsbeerModalDelete from "./tables/sellsbeer/modaldelete";
import SellsbeerModalInsert from "./tables/sellsbeer/modalinsert";
import SellsbeerModalUpdate from "./tables/sellsbeer/modalupdate";

//sellsbeer
import SellsfoodTable from "./tables/sellsfood/sellsfood";
import SellsfoodModalDelete from "./tables/sellsfood/modaldelete";
import SellsfoodModalInsert from "./tables/sellsfood/modalinsert";
import SellsfoodModalUpdate from "./tables/sellsfood/modalupdate";

//shifts
import ShiftsTable from "./tables/shifts/shifts";
import ShiftsModalDelete from "./tables/shifts/modaldelete";
import ShiftsModalInsert from "./tables/shifts/modalinsert";
import ShiftsModalUpdate from "./tables/shifts/modalupdate";

import "./modification.css";

let scrollToElement = require("scroll-to-element");

class Modification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      selectedTable: "",
      selectedOperation: "",
      currentTable: "",
      selectedRow: {},
      processRequest: false,
      results: false,
      open: false
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentWillUnmount = () => {
    this.props.clearModifications();
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      selectedRow: {},
      processRequest: false,
      results: false
    });
  };

  handleClear = picker => {
    this.setState({
      [picker]: "",
      selectedRow: {},
      processRequest: false,
      results: false
    });
  };

  handelInsert = () => {
    this.setState({ processRequest: true, results: true, open: true });
  };

  doneWithRequest = () => {
    this.setState({ selectedRow: {}, open: false });
  };

  handleBegin = () => {
    if (this.state.selectedOperation === "Insert") {
      this.handelInsert();
      return;
    }

    if (
      this.state.selectedOperation === "" ||
      this.state.selectedTable === ""
    ) {
      this.setState({
        errors: {
          emptyinput: "Please make sure to have selected a table and operation"
        }
      });
      return;
    }

    this.setState({
      errors: {},
      selectedRow: {},
      processRequest: false,
      results: false
    });
    this.props.clearModifications();

    switch (this.state.selectedTable) {
      case "Bar":
        this.props.getBars();
        break;
      case "BarFood":
        this.props.getBarfood();
        break;
      case "Bartender":
        this.props.getBartenders();
        break;
      case "Beer":
        this.props.getBeers();
        break;
      case "Bills":
        this.props.getBills();
        break;
      case "Day":
        this.props.getDay();
        break;
      case "Drinker":
        this.props.getDrinkers();
        break;
      case "Frequents":
        this.props.getFrequents();
        break;
      case "Inventory":
        this.props.getInventory();
        break;
      case "Likes":
        this.props.getLikes();
        break;
      case "Operates":
        this.props.getOperates();
        break;
      case "SellsBeer":
        this.props.getSellsbeer();
        break;
      case "SellsFood":
        this.props.getSellsfood();
        break;
      case "Shifts":
        this.props.getShifts();
        break;
      case "Transactions":
        this.props.getTransactions();
        break;
      default:
        this.setState({
          errors: {
            invalidtable: "You seemed to have picked an invalid table."
          }
        });
        return;
    }

    this.setState({ results: true, currentTable: this.state.selectedTable });
  };

  handleSelectedRow = row => () => {
    this.setState({
      selectedRow: row,
      processRequest: true,
      open: true
    });
  };

  handleClearResults = () => {
    this.setState({
      selectedRow: {},
      processRequest: false,
      results: false
    });
    this.props.clearModifications();
  };

  render() {
    let table = "";
    if (this.state.selectedOperation !== "Insert") {
      if (
        this.state.results &&
        this.props.modification[this.state.currentTable].length > 0
      ) {
        if (this.state.currentTable === "Bar") {
          table = (
            <BarTable
              modification={this.props.modification}
              handleSelectedRow={this.handleSelectedRow}
              loading={this.props.modification.loadingModification}
            />
          );
        }
        if (this.state.currentTable === "BarFood") {
          table = (
            <BarFoodTable
              modification={this.props.modification}
              handleSelectedRow={this.handleSelectedRow}
              loading={this.props.modification.loadingModification}
            />
          );
        }
        if (this.state.currentTable === "Bartender") {
          table = (
            <BartenderTable
              modification={this.props.modification}
              handleSelectedRow={this.handleSelectedRow}
              loading={this.props.modification.loadingModification}
            />
          );
        }
        if (this.state.currentTable === "Beer") {
          table = (
            <BeerTable
              modification={this.props.modification}
              handleSelectedRow={this.handleSelectedRow}
              loading={this.props.modification.loadingModification}
            />
          );
        }
        if (this.state.currentTable === "Day") {
          table = (
            <DayTable
              modification={this.props.modification}
              handleSelectedRow={this.handleSelectedRow}
              loading={this.props.modification.loadingModification}
            />
          );
        }
        if (this.state.currentTable === "Drinker") {
          table = (
            <DrinkerTable
              modification={this.props.modification}
              handleSelectedRow={this.handleSelectedRow}
              loading={this.props.modification.loadingModification}
            />
          );
        }
        if (this.state.currentTable === "Frequents") {
          table = (
            <FrequentsTable
              modification={this.props.modification}
              handleSelectedRow={this.handleSelectedRow}
              loading={this.props.modification.loadingModification}
            />
          );
        }
        if (this.state.currentTable === "Likes") {
          table = (
            <LikesTable
              modification={this.props.modification}
              handleSelectedRow={this.handleSelectedRow}
              loading={this.props.modification.loadingModification}
            />
          );
        }
        if (this.state.currentTable === "Operates") {
          table = (
            <OperatesTable
              modification={this.props.modification}
              handleSelectedRow={this.handleSelectedRow}
              loading={this.props.modification.loadingModification}
            />
          );
        }
        if (this.state.currentTable === "SellsBeer") {
          table = (
            <SellsbeerTable
              modification={this.props.modification}
              handleSelectedRow={this.handleSelectedRow}
              loading={this.props.modification.loadingModification}
            />
          );
        }
        if (this.state.currentTable === "SellsFood") {
          table = (
            <SellsfoodTable
              modification={this.props.modification}
              handleSelectedRow={this.handleSelectedRow}
              loading={this.props.modification.loadingModification}
            />
          );
        }
        if (this.state.currentTable === "Shifts") {
          table = (
            <ShiftsTable
              modification={this.props.modification}
              handleSelectedRow={this.handleSelectedRow}
              loading={this.props.modification.loadingModification}
            />
          );
        }
      } else {
        table = `There is no data in the ${this.state.currentTable} table`;
      }
    }

    if (
      !this.props.modification.loadingModification &&
      this.state.results &&
      document.getElementById("table-section")
    ) {
      scrollToElement("#table-section", {
        offset: -52,
        ease: "inOutCube",
        duration: 1000
      });
    }

    return (
      <div id="modification-container">
        <div id="small-page" className="modification-image">
          <div id="small-title" className="push-down">
            <Typography className="small-title-text" variant="h3">
              Modify Our Data
            </Typography>
          </div>
        </div>
        <div className="small-layer" />
        <div id="lets-get-started">
          <Typography
            id="beer-start"
            variant="h4"
            className="lets-get-started-text"
          >
            How To Get Started
          </Typography>
        </div>
        <Grid container className="step-container">
          <Grid item xs={12} sm={6} className="step-grid">
            <Typography variant="h4" className="step-title">
              Step 1
            </Typography>
            <Typography className="step-text">
              First pick a table from the 'Select Table' picker. This will load
              in information from your selected table. From here you will then
              move on to step two where you will pick an operation which you
              wish to carry out on your selcted table.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} className="step-grid">
            <Typography variant="h4" className="step-title">
              Step 2
            </Typography>
            <Typography className="step-text">
              Now that you have selected a table, you will select an operation
              which you wish to perform on your selected table. Once you select
              an operation you will then carry out the desired change. We will
              make sure that all changes you wish to perform are valid. If they
              are you will get a success message, if not we will display a
              warning.
            </Typography>
          </Grid>
          {this.props.modification.loadingModification && (
            <Grid item xs={12}>
              <img
                src={require("../../images/spinner.gif")}
                alt="loading..."
                style={{ width: "100px", margin: "auto", display: "block" }}
              />
            </Grid>
          )}
          <Grid item xs={12} sm={6} className="step-grid">
            <div className="form-control-grid">
              <FormControl className="form-control">
                <InputLabel>Select Table</InputLabel>
                <Select
                  className="selecter"
                  value={this.state.selectedTable}
                  inputProps={{
                    name: "selectedTable"
                  }}
                  onChange={this.handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Bar">Bar</MenuItem>
                  <MenuItem value="BarFood">BarFood</MenuItem>
                  <MenuItem value="Bartender">Bartender</MenuItem>
                  <MenuItem value="Beer">Beer</MenuItem>
                  <MenuItem value="Bills">Bills</MenuItem>
                  <MenuItem value="Day">Day</MenuItem>
                  <MenuItem value="Drinker">Drinker</MenuItem>
                  <MenuItem value="Frequents">Frequents</MenuItem>
                  <MenuItem value="Inventory">Inventory</MenuItem>
                  <MenuItem value="Likes">Likes</MenuItem>
                  <MenuItem value="Operates">Operates</MenuItem>
                  <MenuItem value="SellsBeer">SellsBeer</MenuItem>
                  <MenuItem value="SellsFood">SellsFood</MenuItem>
                  <MenuItem value="Shifts">Shifts</MenuItem>
                  <MenuItem value="Transactions">Transactions</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="button-clear-pickers">
              <Button
                value="selectedTable"
                className="actual-clear-button"
                onClick={() => this.handleClear("selectedTable")}
              >
                Clear Table
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} className="step-grid">
            <div className="form-control-grid">
              <FormControl className="form-control">
                <InputLabel>Select Operation</InputLabel>
                <Select
                  className="selecter"
                  value={this.state.selectedOperation}
                  inputProps={{
                    name: "selectedOperation"
                  }}
                  onChange={this.handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Insert">Insert</MenuItem>
                  <MenuItem value="Update">Update</MenuItem>
                  <MenuItem value="Delete">Delete</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="button-clear-pickers">
              <Button
                value="selectedOperation"
                className="actual-clear-button"
                onClick={() => this.handleClear("selectedOperation")}
              >
                Clear Operation
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            {this.state.errors.emptyinput && (
              <Typography style={{ color: "red" }}>
                **{this.state.errors.emptyinput}
              </Typography>
            )}
            <div id="begin-button-container">
              <Button id="begin-button" onClick={() => this.handleBegin()}>
                Begin Operation
              </Button>
            </div>
          </Grid>
        </Grid>
        {this.state.results &&
          this.state.selectedOperation !== "Insert" &&
          this.props.modification[this.state.currentTable].length > 0 && (
            <div id="table-section">
              <Grid container>
                {!this.props.modification.loadingModification && (
                  <Grid item xs={12}>
                    <div id="lets-get-started">
                      <Typography
                        variant="h4"
                        className="lets-get-started-text"
                      >
                        Data In {this.state.currentTable} Table
                      </Typography>
                    </div>
                  </Grid>
                )}
                <Grid item xs={12} style={{ textAlign: "center" }}>
                  <Button
                    id="results-clear"
                    onClick={() => this.handleClearResults()}
                  >
                    Clear Results
                  </Button>
                </Grid>
                <Grid item xs={12} style={{ textAlign: "center" }}>
                  <Typography variant="h5" style={{ marginTop: "10px" }}>
                    Click on a row to perform your desired operation
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  {table}
                </Grid>
              </Grid>
            </div>
          )}
        {/* BAR */}
        {this.state.processRequest &&
          this.state.open &&
          this.state.selectedOperation === "Delete" &&
          this.state.currentTable === "Bar" && (
            <BarModalDelete
              row={this.state.selectedRow}
              open={this.state.open}
              doneWithRequest={this.doneWithRequest}
              handleDelete={() => alert("Delete!")}
            />
          )}
        {this.state.processRequest &&
          this.state.open &&
          this.state.selectedOperation === "Update" &&
          this.state.currentTable === "Bar" && (
            <BarModalUpdate
              row={this.state.selectedRow}
              open={this.state.open}
              doneWithRequest={this.doneWithRequest}
              handleDelete={() => alert("Delete!")}
            />
          )}
        {this.state.processRequest &&
          this.state.open &&
          this.state.selectedOperation === "Insert" &&
          this.state.selectedTable === "Bar" && (
            <BarModalInsert
              open={this.state.open}
              doneWithRequest={this.doneWithRequest}
              handleInsert={alert("Insert!")}
            />
          )}
        {/* BAR FOOD */}
        {this.state.processRequest &&
          this.state.open &&
          this.state.selectedOperation === "Delete" &&
          this.state.currentTable === "BarFood" && (
            <BarFoodModalDelete
              row={this.state.selectedRow}
              open={this.state.open}
              doneWithRequest={this.doneWithRequest}
              handleDelete={() => alert("Delete!")}
            />
          )}
        {this.state.processRequest &&
          this.state.open &&
          this.state.selectedOperation === "Update" &&
          this.state.currentTable === "BarFood" && (
            <BarFoodModalUpdate
              row={this.state.selectedRow}
              open={this.state.open}
              doneWithRequest={this.doneWithRequest}
              handleDelete={() => alert("Delete!")}
            />
          )}
        {this.state.processRequest &&
          this.state.open &&
          this.state.selectedOperation === "Insert" &&
          this.state.selectedTable === "BarFood" && (
            <BarFoodModalInsert
              open={this.state.open}
              doneWithRequest={this.doneWithRequest}
              handleInsert={alert("Insert!")}
            />
          )}
        {/* BARTENDER */}
        {this.state.processRequest &&
          this.state.open &&
          this.state.selectedOperation === "Delete" &&
          this.state.currentTable === "Bartender" && (
            <BartenderModalDelete
              row={this.state.selectedRow}
              open={this.state.open}
              doneWithRequest={this.doneWithRequest}
              handleDelete={alert("Delete!")}
            />
          )}
        {this.state.processRequest &&
          this.state.open &&
          this.state.selectedOperation === "Update" &&
          this.state.currentTable === "Bartender" && (
            <BartenderModalUpdate
              row={this.state.selectedRow}
              open={this.state.open}
              doneWithRequest={this.doneWithRequest}
              handleDelete={alert("Delete!")}
            />
          )}
        {this.state.processRequest &&
          this.state.open &&
          this.state.selectedOperation === "Insert" &&
          this.state.selectedTable === "Bartender" && (
            <BartenderModalInsert
              open={this.state.open}
              doneWithRequest={this.doneWithRequest}
              handleInsert={alert("Insert!")}
            />
          )}
        {/* BEER */}
        {this.state.processRequest &&
          this.state.open &&
          this.state.selectedOperation === "Delete" &&
          this.state.currentTable === "Beer" && (
            <BeerModalDelete
              row={this.state.selectedRow}
              open={this.state.open}
              doneWithRequest={this.doneWithRequest}
              handleDelete={alert("Delete!")}
            />
          )}
        {this.state.processRequest &&
          this.state.open &&
          this.state.selectedOperation === "Update" &&
          this.state.currentTable === "Beer" && (
            <BeerModalUpdate
              row={this.state.selectedRow}
              open={this.state.open}
              doneWithRequest={this.doneWithRequest}
              handleDelete={alert("Delete!")}
            />
          )}
        {this.state.processRequest &&
          this.state.open &&
          this.state.selectedOperation === "Insert" &&
          this.state.selectedTable === "Beer" && (
            <BeerModalInsert
              open={this.state.open}
              doneWithRequest={this.doneWithRequest}
              handleInsert={alert("Insert!")}
            />
          )}
        {/* DAY */}
        {this.state.processRequest &&
          this.state.open &&
          this.state.selectedOperation === "Delete" &&
          this.state.currentTable === "Day" && (
            <DayModalDelete
              row={this.state.selectedRow}
              open={this.state.open}
              doneWithRequest={this.doneWithRequest}
              handleDelete={alert("Delete!")}
            />
          )}
        {this.state.processRequest &&
          this.state.open &&
          this.state.selectedOperation === "Update" &&
          this.state.currentTable === "Day" && (
            <DayModalUpdate
              row={this.state.selectedRow}
              open={this.state.open}
              doneWithRequest={this.doneWithRequest}
              handleDelete={alert("Delete!")}
            />
          )}
        {this.state.processRequest &&
          this.state.open &&
          this.state.selectedOperation === "Insert" &&
          this.state.selectedTable === "Day" && (
            <DayModalInsert
              open={this.state.open}
              doneWithRequest={this.doneWithRequest}
              handleInsert={alert("Insert!")}
            />
          )}
        {/* DRINKER */}
        {this.state.processRequest &&
          this.state.open &&
          this.state.selectedOperation === "Delete" &&
          this.state.currentTable === "Drinker" && (
            <DrinkerModalDelete
              row={this.state.selectedRow}
              open={this.state.open}
              doneWithRequest={this.doneWithRequest}
              handleDelete={alert("Delete!")}
            />
          )}
        {this.state.processRequest &&
          this.state.open &&
          this.state.selectedOperation === "Update" &&
          this.state.currentTable === "Drinker" && (
            <DrinkerModalUpdate
              row={this.state.selectedRow}
              open={this.state.open}
              doneWithRequest={this.doneWithRequest}
              handleDelete={alert("Delete!")}
            />
          )}
        {this.state.processRequest &&
          this.state.open &&
          this.state.selectedOperation === "Insert" &&
          this.state.selectedTable === "Drinker" && (
            <DrinkerModalInsert
              open={this.state.open}
              doneWithRequest={this.doneWithRequest}
              handleInsert={alert("Insert!")}
            />
          )}
        {/* FREQUENTS */}
        {this.state.processRequest &&
          this.state.open &&
          this.state.selectedOperation === "Delete" &&
          this.state.currentTable === "Frequents" && (
            <FrequentsModalDelete
              row={this.state.selectedRow}
              open={this.state.open}
              doneWithRequest={this.doneWithRequest}
              handleDelete={alert("Delete!")}
            />
          )}
        {this.state.processRequest &&
          this.state.open &&
          this.state.selectedOperation === "Update" &&
          this.state.currentTable === "Frequents" && (
            <FrequentsModalUpdate
              row={this.state.selectedRow}
              open={this.state.open}
              doneWithRequest={this.doneWithRequest}
              handleDelete={alert("Delete!")}
            />
          )}
        {this.state.processRequest &&
          this.state.open &&
          this.state.selectedOperation === "Insert" &&
          this.state.selectedTable === "Frequents" && (
            <FrequentsModalInsert
              open={this.state.open}
              doneWithRequest={this.doneWithRequest}
              handleInsert={alert("Insert!")}
            />
          )}
        {/* lIKES */}
        {this.state.processRequest &&
          this.state.open &&
          this.state.selectedOperation === "Delete" &&
          this.state.currentTable === "Likes" && (
            <LikesModalDelete
              row={this.state.selectedRow}
              open={this.state.open}
              doneWithRequest={this.doneWithRequest}
              handleDelete={alert("Delete!")}
            />
          )}
        {this.state.processRequest &&
          this.state.open &&
          this.state.selectedOperation === "Update" &&
          this.state.currentTable === "Likes" && (
            <LikesModalUpdate
              row={this.state.selectedRow}
              open={this.state.open}
              doneWithRequest={this.doneWithRequest}
              handleDelete={alert("Delete!")}
            />
          )}
        {this.state.processRequest &&
          this.state.open &&
          this.state.selectedOperation === "Insert" &&
          this.state.selectedTable === "Likes" && (
            <LikesModalInsert
              open={this.state.open}
              doneWithRequest={this.doneWithRequest}
              handleInsert={alert("Insert!")}
            />
          )}
        {/* OPERATES */}
        {this.state.processRequest &&
          this.state.open &&
          this.state.selectedOperation === "Delete" &&
          this.state.currentTable === "Operates" && (
            <OperatesModalDelete
              row={this.state.selectedRow}
              open={this.state.open}
              doneWithRequest={this.doneWithRequest}
              handleDelete={alert("Delete!")}
            />
          )}
        {this.state.processRequest &&
          this.state.open &&
          this.state.selectedOperation === "Update" &&
          this.state.currentTable === "Operates" && (
            <OperatesModalUpdate
              row={this.state.selectedRow}
              open={this.state.open}
              doneWithRequest={this.doneWithRequest}
              handleDelete={alert("Delete!")}
            />
          )}
        {this.state.processRequest &&
          this.state.open &&
          this.state.selectedOperation === "Insert" &&
          this.state.selectedTable === "Operates" && (
            <OperatesModalInsert
              open={this.state.open}
              doneWithRequest={this.doneWithRequest}
              handleInsert={alert("Insert!")}
            />
          )}
        {/* SELLSBEER */}
        {this.state.processRequest &&
          this.state.open &&
          this.state.selectedOperation === "Delete" &&
          this.state.currentTable === "SellsBeer" && (
            <SellsbeerModalDelete
              row={this.state.selectedRow}
              open={this.state.open}
              doneWithRequest={this.doneWithRequest}
              handleDelete={alert("Delete!")}
            />
          )}
        {this.state.processRequest &&
          this.state.open &&
          this.state.selectedOperation === "Update" &&
          this.state.currentTable === "SellsBeer" && (
            <SellsbeerModalUpdate
              row={this.state.selectedRow}
              open={this.state.open}
              doneWithRequest={this.doneWithRequest}
              handleDelete={alert("Delete!")}
            />
          )}
        {this.state.processRequest &&
          this.state.open &&
          this.state.selectedOperation === "Insert" &&
          this.state.selectedTable === "SellsBeer" && (
            <SellsbeerModalInsert
              open={this.state.open}
              doneWithRequest={this.doneWithRequest}
              handleInsert={alert("Insert!")}
            />
          )}
        {/* SELLSFOOD */}
        {this.state.processRequest &&
          this.state.open &&
          this.state.selectedOperation === "Delete" &&
          this.state.currentTable === "SellsFood" && (
            <SellsfoodModalDelete
              row={this.state.selectedRow}
              open={this.state.open}
              doneWithRequest={this.doneWithRequest}
              handleDelete={alert("Delete!")}
            />
          )}
        {this.state.processRequest &&
          this.state.open &&
          this.state.selectedOperation === "Update" &&
          this.state.currentTable === "SellsFood" && (
            <SellsfoodModalUpdate
              row={this.state.selectedRow}
              open={this.state.open}
              doneWithRequest={this.doneWithRequest}
              handleDelete={alert("Delete!")}
            />
          )}
        {this.state.processRequest &&
          this.state.open &&
          this.state.selectedOperation === "Insert" &&
          this.state.selectedTable === "SellsFood" && (
            <SellsfoodModalInsert
              open={this.state.open}
              doneWithRequest={this.doneWithRequest}
              handleInsert={alert("Insert!")}
            />
          )}
        {/* SHIFTS */}
        {this.state.processRequest &&
          this.state.open &&
          this.state.selectedOperation === "Delete" &&
          this.state.currentTable === "Shifts" && (
            <ShiftsModalDelete
              row={this.state.selectedRow}
              open={this.state.open}
              doneWithRequest={this.doneWithRequest}
              handleDelete={alert("Delete!")}
            />
          )}
        {this.state.processRequest &&
          this.state.open &&
          this.state.selectedOperation === "Update" &&
          this.state.currentTable === "Shifts" && (
            <ShiftsModalUpdate
              row={this.state.selectedRow}
              open={this.state.open}
              doneWithRequest={this.doneWithRequest}
              handleDelete={alert("Delete!")}
            />
          )}
        {this.state.processRequest &&
          this.state.open &&
          this.state.selectedOperation === "Insert" &&
          this.state.selectedTable === "Shifts" && (
            <ShiftsModalInsert
              open={this.state.open}
              doneWithRequest={this.doneWithRequest}
              handleInsert={alert("Insert!")}
            />
          )}
      </div>
    );
  }
}

Modification.propTypes = {
  modification: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
Modification.defaultProps = {
  modification: {}
};

const mapStateToProps = state => ({
  modification: state.modification,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  {
    clearModifications,
    getDrinkers,
    getBars,
    getBeers,
    getShifts,
    getBarfood,
    getDay,
    getFrequents,
    getLikes,
    getInventory,
    getOperates,
    getSellsbeer,
    getSellsfood,
    getBartenders,
    getBills,
    getTransactions
  }
)(withRouter(Modification));

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Grid
} from "@material-ui/core";
import {
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
  Close
} from "@material-ui/icons";
import Form from "./formcontrol";

import "../table.css";

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5
  }
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1)
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
          id="hidden-when-small"
        >
          {theme.direction === "rtl" ? <LastPage /> : <FirstPage />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
          id="hidden-when-small"
        >
          {theme.direction === "rtl" ? <FirstPage /> : <LastPage />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, {
  withTheme: true
})(TablePaginationActions);

const styles = theme => ({
  root: {
    width: "100%"
  },
  table: {
    minWidth: "100%"
  },
  tableWrapper: {
    overflowX: "auto"
  }
});

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const stableSort = (array, cmp) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
};

const desc = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getSorting = (order, orderBy) => {
  return order === "descending"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
};

class CustomPaginationActionsTable extends React.Component {
  state = {
    rows: this.props.modification.Operates,
    page: 0,
    rowsPerPage: 5,
    order: "ascending",
    orderBy: "bar"
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({
      rowsPerPage: event.target.value
    });
  };

  changeOrder = (by, order) => () => {
    this.setState({
      orderBy: by,
      order
    });
  };

  selectedRowChange = row => () => {
    this.props.handleSelectedRow(row)();
  };

  handleChange = event => {
    this.setState({
      rows:
        event.target.value === ""
          ? this.props.modification.Operates
          : this.props.modification.Operates.filter(
              person =>
                person.bar
                  .toLowerCase()
                  .substring(0, event.target.value.length) ===
                event.target.value.toLowerCase()
            )
    });
  };

  clearSearch = () => {
    document.getElementById("search-box").value = "";
    this.setState({
      rows: this.props.modification.Operates
    });
  };

  render() {
    const { classes } = this.props;
    const { rows, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    return (
      <div id="table-container">
        <Grid container id="table-grid">
          <Grid item xs={12} sm={4}>
            <Form
              changeOrder={this.changeOrder}
              style={{ backgroundColor: "blue" }}
            />
          </Grid>
          <Grid item xs={10} sm={6}>
            <TextField
              id="search-box"
              className="search-box"
              label="Search By Bar"
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={2} sm={2}>
            <IconButton
              className="clear-button-searched-mod"
              onClick={this.clearSearch}
            >
              <Close className="close-button-searched-mod" />
            </IconButton>
          </Grid>
        </Grid>
        <Paper className={classes.root}>
          <div className={classes.tableWrapper}>
            <Table
              className={classes.table}
              style={{
                backgroundColor: "whitesmoke",
                borderRadius: "10px"
              }}
            >
              <TableHead>
                <TableRow>
                  <CustomTableCell className="head-row left-row">
                    Bar
                  </CustomTableCell>
                  <CustomTableCell className="head-row">Date</CustomTableCell>
                  <CustomTableCell className="head-row ">Day</CustomTableCell>
                  <CustomTableCell className="head-row ">End</CustomTableCell>
                  <CustomTableCell className="head-row right-row">
                    Start
                  </CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stableSort(
                  rows,
                  getSorting(this.state.order, this.state.orderBy)
                )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, i) => {
                    return (
                      <TableRow
                        key={i}
                        id="info-row"
                        disabled={this.props.modification.loadingModification}
                        onClick={
                          !this.props.loading && this.selectedRowChange(row)
                        }
                      >
                        <TableCell>{row.bar}</TableCell>
                        <TableCell>{row.date}</TableCell>
                        <TableCell>{row.day}</TableCell>
                        <TableCell>{row.end}</TableCell>
                        <TableCell>{row.start}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 48 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    colSpan={3}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActionsWrapped}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </Paper>
      </div>
    );
  }
}

CustomPaginationActionsTable.propTypes = {
  classes: PropTypes.object.isRequired,
  modification: PropTypes.object.isRequired,
  handleSelectedRow: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

export default withStyles(styles)(CustomPaginationActionsTable);

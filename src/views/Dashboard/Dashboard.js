import React, { useState } from "react";
import {NavLink} from "react-router-dom"
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from '@material-ui/core/styles';
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Modal from '@material-ui/core/Modal'
import Fade from '@material-ui/core/Fade'
import Backdrop from '@material-ui/core/Backdrop';
import TableList from "views/TableList/TableList.js";
import Accordian from "components/Accordian/Accordian.js";


// import routes from "../../routes";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';


import MaterialTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { classicNameResolver } from "typescript";

const useStyles = makeStyles(styles);

const apiURL = "http://localhost:6001/payees";



export default function Dashboard() {
  const [customerList, setCustomerList] = React.useState([]);
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = React.useState([]);
    const handleOpenAndClose = (clickedRow) => {
    setOpen(!open);
    modalClickInfo(clickedRow);
  };

  const modalClickInfo = (clickedRow) => {
    const name = clickedRow[0];
    const cus = customerList.filter(customer => {
      return customer.Payee.Name === name;
    });
    setCustomer(cus);
  };

  const classes = useStyles();
  // grab data from API
  React.useEffect(() => {
    fetch(apiURL)
      .then((res) => {
        return res.json();
      })
      .catch(err => console.log(err, 'this is err'))
      .then((res) => setCustomerList(res));
  }, [customerList]);

  const getCustomerList = (payeeList) => {
    return payeeList.map((p) => {
      const date = new Date(p.Payee.SubmissionDate);
      const formattedDate = date.toUTCString().slice(0, -12);
      const numToString = JSON.stringify(p.Payment.PAN);
      const formattedCC = `${'*'.repeat(numToString.length - 4)}${numToString.slice(-4)} EXP ${p.Payment.Exp}`;
      return [p.Payee.Name, p.Payee.Phone, formattedDate, formattedCC];
    });
  };

  const date = new Date();

  return (
    <div>
      {/* <h4>{customerList[0].keys()}</h4> */}
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Payee</h4>
              <p className={classes.cardCategoryWhite}>
                Today is {new Date().toUTCString().slice(0, -12)}
              </p>
            </CardHeader>
            <CardBody>
            <Accordian cList={getCustomerList(customerList)}>

            </Accordian>
              {/* <Table
                tableHeaderColor="primary"
                tableHead={["Name", "Phone Number", "Submission Date", "Payment"]}
                tableData={getCustomerList(customerList)}
                handleOpenAndClose={handleOpenAndClose}
              /> */}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/ExpansionPanel";
import AccordionDetails from "@material-ui/core/ExpansionPanelDetails";
import AccordionSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import payeeData from '../../payeeData.json';
// import TableHead from "@material-ui/core/TableHead";
// import { TableRow } from "@material-ui/core";
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import {
  warningColor,
  primaryColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  defaultFont
} from "assets/jss/material-dashboard-react.js";



import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 1,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  table: {
    marginBottom: "0",
    width: "100%",
    maxWidth: "100%",
    backgroundColor: "transparent",
    borderSpacing: "0",
    borderCollapse: "collapse"
  },
  tableHeadCell: {
    color: "inherit",
    ...defaultFont,
    "&, &$tableCell": {
      fontSize: "1em"
    }
  },
  tableCell: {
    // ...defaultFont,
    lineHeight: "1.42857143",
    padding: "12px 8px 0px 60px",
    verticalAlign: "middle",
    fontSize: "0.8125rem"
  },
  tableResponsive: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  tableHeadRow: {
    height: "56px",
    color: "inherit",
    display: "table-row",
    outline: "none",
    verticalAlign: "middle"
  },
  tableBodyRow: {
    height: "48px",
    color: "inherit",
    display: "table-row",
    outline: "none",
    verticalAlign: "middle",
    cursor: "pointer",
  },
  typo: {
    paddingLeft: "40px",
    fontSize: "15px",
    fontWeight: "bold"
  }
}));

const apiURL = "http://localhost:6001/payees";

export default function Accordian(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [customerList, setCustomerList] = React.useState([]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  React.useEffect(() => {
    setCustomerList(payeeData)
    // fetch(apiURL)
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .catch((err) => console.log(err, "this is err"))
    //   .then((res) => setCustomerList(res));
  }, [customerList]);

  return (
    <div className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow className={classes.tableHeadRow}>
            <TableCell className={classes.tableCell}>Name</TableCell>
            <TableCell className={classes.tableCell}>Phone Number</TableCell>
            <TableCell className={classes.tableCell}>Submission Date</TableCell>
            <TableCell className={classes.tableCell}>Payment</TableCell>
          </TableRow>
        </TableHead>
      </Table>
      {customerList.map((customer, index) => {
        const ccStr = JSON.stringify(customer.Payment.PAN);
        // console.log(length);
        return (
          // eslint-disable-next-line react/jsx-key
          <Accordion
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={`${classes.heading} ${classes.typo}`}>
                {customer.Payee.Name}
              </Typography>
              <Typography className={`${classes.heading} ${classes.typo}`}>
                {customer.Payee.Phone}
              </Typography>
              <Typography className={`${classes.heading} ${classes.typo}`}>
                {customer.Payee.SubmissionDate}
              </Typography>
              <Typography className={`${classes.heading} ${classes.typo}`}>
                {`${"*".repeat(ccStr.length - 4)} ${ccStr.slice(-4)} EXP ${customer.Payment.Exp}`}
              </Typography>
              {/* <Typography className={classes.secondaryHeading}>
                I am an accordion
              </Typography> */}
            </AccordionSummary>
            <AccordionDetails>
              <Table>
                <TableHead>
                  <TableRow >
                    <TableCell >Payor Name</TableCell>
                    <TableCell >Payor ID</TableCell>
                    <TableCell >Invoice Number</TableCell>
                    <TableCell >Amount Paid</TableCell>
                    <TableCell >Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customer.Remittance.map(remittance => {
                    return (
                      <TableRow>
                          <TableCell >{remittance.PayorName}</TableCell>
                          <TableCell >{remittance.PayorId}</TableCell>
                          <TableCell >{remittance.InvoiceNo}</TableCell>
                          <TableCell >{remittance.Amount}</TableCell>
                          <TableCell >{remittance.Description}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
              {/* <Typography>
                Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                feugiat. Aliquam eget maximus est, id dignissim quam.
              </Typography> */}
            </AccordionDetails>
          </Accordion>
        );
      })}
      {/* <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.heading}>Users</Typography>
          <Typography className={classes.secondaryHeading}>
            You are currently not an owner
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
            diam eros in elit. Pellentesque convallis laoreet laoreet.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography className={classes.heading}>Advanced settings</Typography>
          <Typography className={classes.secondaryHeading}>
            Filtering has been entirely disabled for whole web server
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
            vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion> */}
      {/* <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography className={classes.heading}>Personal data</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
            vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion> */}
    </div>
  );
}

import React, { Component } from "react"
import { dayNames, shortDayNames } from "./../utils/Strings"
import { withStyles, createStyleSheet } from "material-ui/styles"
import Typography from "material-ui/Typography"
import PropTypes from "prop-types"
import Paper from "material-ui/Paper"
import Toolbar from "material-ui/Toolbar"
import { getWeeksOfMonth, getDaysInMonth } from "./../utils/DateHelper"
import DayCard from "./DayCard"
import { getEvents } from "./../api/api"

const styleSheet = createStyleSheet("MonthView", theme => ({
  root: {
    display: "flex",
    position: "relative",
    height: "550px"
  },
  dayDiv: {
    position: "relative",
    width: "20%"
  },
  dayTitleBar: {
    position: "relative",
    height: "50px",
    backgroundColor: "#004987",
    color: "#FFFFFF",
    fontWeight: "bold"
  },
  monthDiv: {
    width: "80%",
    height: "100%",
    overflow: "hidden"
  },
  monthTitleBar: {
    position: "relative",
    height: "50px"
  },
  table: {
    width: "100%",
    borderTop: "hidden",
    borderLeft: "hidden",
    borderRight: "hidden",
    borderCollapse: "collapse",
    height: "100%"
  },
  tableHead: {
    border: "1px solid rgba(0, 0, 0, 0.075)",
    color: "#000000",
    opacity: 0.7,
    textAlign: "center",
    fontWeight: "bold",
    borderTop: "hidden",
    height: "20%"
  },
  tableBody: {
    backgroundColor: "rgb(255,243,233)",
    color: "#000000",
    textAlign: "left",
    verticalAlign: "top"
  }
}))

class MonthView extends Component {
  constructor() {
    super()
    this.state = {
      selectedDay: new Date().getDate(),
      selectedWeekDay: new Date().getDay(),
    }
    this.monthDayCounter = 1
  }

  handleSelect(day, weekDay){
   this.setState({selectedDay: day, selectedWeekDay: weekDay})   
  }
 
  

  getMonthRows = () => {
    let first = new Date(
      this.props.currentDateRange.year,
      this.props.currentDateRange.month,
      1
    )
    let wks = getWeeksOfMonth(first)
    let rows = []

    for (let i = 0; i < wks; i++) {
      rows.push(<tr>{this.getDays(i)}</tr>)
    }
    this.monthDayCounter = 1
    return rows
  }

  getDays = wk => {
    let days = []
    let numDays = getDaysInMonth(
      this.props.currentDateRange.year,
      this.props.currentDateRange.month
    ).getDate()

    let first = new Date(
      this.props.currentDateRange.year,
      this.props.currentDateRange.month,
      1
    )

    let today = new Date()
    for (let i = 0; i < 7; i++) {
      if (this.monthDayCounter > numDays) {
        days.push(
          <td
            style={{
              fontSize: "15px",
              border: "1px solid white",
              padding: "10px",
              backgroundColor: "#E0E0E0"
            }}
          />
        )
      } else if (
        this.monthDayCounter === 1 &&
        wk === 0 &&
        first.getDay() !== i
      ) {
        days.push(
          <td
            style={{
              fontSize: "15px",
              border: "1px solid white",
              padding: "10px",
              backgroundColor: "#E0E0E0"
            }}
          />
        )
      } else {
        if (
          this.props.currentDateRange.year === today.getFullYear() &&
          this.props.currentDateRange.month === today.getMonth() &&
          this.monthDayCounter === today.getDate()
        ) {
          console.log( this.monthDayCounter)
          let dateObj = this.props.currentDateRange
          days.push(
            <td
              tabIndex="0"              
              onClick={() => this.props.changeDateRange(dateObj)}
               style={{
                fontSize: "15px",
                fontWeight: "bold",
                color: "#000000",
                border: "1px solid white",
                padding: "10px",
                backgroundColor: "rgba(86,162,234, 0.5)"
              }}
            >
              <Typography               
                type="body1"
                component="div"
                style={{ fontWeight: "600" }}
              >
                {this.monthDayCounter}
              </Typography>
            </td>
          )
        } else {
          console.log( this.monthDayCounter)
          let dateObj = this.props.currentDateRange
          days.push(
            <td
              tabIndex="0"
              onClick={() => this.props.changeDateRange(dateObj)}             
              style={{
                fontSize: "15px",
                border: "1px solid white",
                padding: "10px"
              }}
            >
              <Typography type="body1" component="div">
                {this.monthDayCounter}
              </Typography>

            </td>
          )
        }
        this.monthDayCounter++
      }
    }
    return days
  }

  weekDays() {
    let weekDaysRow = []

    for (let i = 0; i < 7; ++i) {
      weekDaysRow.push(
        <td key={weekDaysRow[i]} style={{ width: "100rem" }}>
          <Typography type="body1" component="div" style={{ fontWeight: 600 }}>
            {shortDayNames[i]}
          </Typography>
        </td>
      )
    }
    return weekDaysRow
  }

  render() {
   {console.log(this.props.currentDateRange)}
      const classes = this.props.classes
      return (
        <Paper tabIndex="0" aria-label={"Month View Calendar"} className={classes.root}>
          <div aria-label="Day schedule" className={classes.dayDiv}>
            <Toolbar className={classes.dayTitleBar}>
              <Typography type="title">
              </Typography>
            </Toolbar>
            <DayCard  calendarMeeting={this.props.calendar} 
                      month={this.props.currentDateRange.month}
                      day={this.props.currentDateRange.day}
                      
            />
          </div>
          <div className={classes.monthDiv}>
            <table className={classes.table}>
              <thead className={classes.tableHead}>
                <tr style={{ height: "50px" }}>
                  {this.weekDays()}
                </tr>
              </thead>
              <tbody className={classes.tableBody}>
                {this.getMonthRows()}
              </tbody>

            </table>
          </div>
        </Paper>
      )
    }
  
}

MonthView.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styleSheet)(MonthView)

/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */


const createEmployeeRecord = function(empArry){
    const [firstName,familyName,title,payPerHour,timeInEvents=[],timeOutEvents=[]] = empArry
    const employee = {
        firstName:firstName,
        familyName:familyName,
        title:title,
        payPerHour:payPerHour,
        timeInEvents:timeInEvents,
        timeOutEvents:timeOutEvents
    }
    return employee
}

const createEmployeeRecords = function(arrOfArrysOfEmps){
    return arrOfArrysOfEmps.map((empObj)=>{
        return createEmployeeRecord(empObj)
    })
}

const createTimeInEvent = function(clockIn){
    const parseTime = clockIn.split(" ")
    const [date,hour] = parseTime
    this.timeInEvents.push({
        type:"TimeIn",
        date,
        hour:parseInt(hour,10)
    })
    return this
}
const createTimeOutEvent = function(clockOut){
    const parseTime = clockOut.split(" ")
    const [date,hour] = parseTime
    this.timeOutEvents.push({
        type:"TimeOut",
        date,
        hour:parseInt(hour,10)
    })
    return this
}

let hoursWorkedOnDate = function(queryDate){
    let clockIn = this.timeInEvents.find((e)=>{
        return e.date === queryDate
    })
    let clockOut = this.timeOutEvents.find((e)=>{
        return e.date === queryDate
    })
    
    return (clockOut.hour - clockIn.hour)/100
}

const wagesEarnedOnDate = function(queryDate){
    return (this.payPerHour * hoursWorkedOnDate.call(this,queryDate))
}

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(rec){
      return rec.firstName === firstName
    })
  }
  
  let calculatePayroll = function(arrayOfEmployeeRecords){
      return arrayOfEmployeeRecords.reduce(function(memo, rec){
          return memo + allWagesFor.call(rec)
      }, 0)
  }
  
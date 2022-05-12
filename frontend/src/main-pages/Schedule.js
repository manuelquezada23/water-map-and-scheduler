import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import { IoCloseCircleSharp } from "react-icons/io5";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const times = [
    "12:00 AM", "12:30 AM", "01:00 AM", "01:30 AM", "02:00 AM", "02:30 AM", "03:00 AM", "03:30 AM", "04:00 AM", "04:30 AM", "05:00 AM", "05:30 AM", "06:00 AM",
    "06:30 AM", "07:00 AM", "07:30 AM", "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
    "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM",
    "07:30 PM", "08:00 PM", "08:30 PM", "09:00 PM", "09:30 PM", "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM"
]

const scheduleTimes = [
    "12:00AM", "01:00AM", "02:00AM", "03:00AM", "04:00AM", "05:00AM", "06:00AM",
    "07:00AM", "08:00AM", "09:00AM", "10:00AM", "11:00AM", "12:00PM", "01:00PM",
    "02:00PM", "03:00PM", "04:00PM", "05:00PM", "06:00PM", "07:00PM", "08:00PM",
    "09:00PM", "10:00PM", "11:00PM"
]

function convertTime(timeStr) {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') {
        hours = '00';
    }
    if (modifier === 'PM') {
        hours = parseInt(hours, 10) + 12;
    }

    return hours + ":" + minutes
}

function UTCTo12Hr(time) {
    let first = time.split('T')[1]
    let second = first.split('Z')[0]
    var date = new Date("February 04, 2011 " + second + ":00");
    var options = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };
    var timeString = date.toLocaleString('en-US', options);
    return timeString
}

function Schedule() {
    const [monday, setMonday] = useState(false)
    const [tuesday, setTuesday] = useState(false)
    const [wednesday, setWednesday] = useState(false)
    const [thursday, setThursday] = useState(false)
    const [friday, setFriday] = useState(false)
    const [saturday, setSaturday] = useState(false)
    const [sunday, setSunday] = useState(false)
    const [startTime, setStartTime] = useState('12:00 AM')
    const [endTime, setEndTime] = useState('12:00 AM')
    const [location, setLocation] = useState('')
    const [locations, setLocations] = useState([])
    const [firstLocation, setFirstLocation] = useState()
    const [data, setData] = useState([])
    const [wait, setAwait] = useState(false)
    const [currentUserID, setCurrentUserID] = useState('')

    function convertDataIntoArray(data) {
        let newData = []
        for (let i = 0; i < data.length; i++) {
            newData.push(data[i].nameValuePairs);
        }
        return newData;
    }


    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const sqlCommand = "SELECT * FROM events WHERE UserID = '" + user.uid + "'";
                const sqlCommandTwo = "SELECT * FROM buildings";

                const postParameters = {
                    sql: sqlCommand
                }

                const postParametersTwo = {
                    sql: sqlCommandTwo
                }

                fetch('http://localhost:4567/get-sql-rs', {
                    method: 'POST',
                    body: JSON.stringify(postParameters),
                    headers: { 'Access-Control-Allow-Origin': '*' },
                }).then((response) => response.json()).then((data) => {
                    setAwait(false)
                    setCurrentUserID(user.uid);
                    setData(convertDataIntoArray(data.values))
                })

                fetch('http://localhost:4567/get-sql-rs', {
                    method: 'POST',
                    body: JSON.stringify(postParametersTwo),
                    headers: { 'Access-Control-Allow-Origin': '*' },
                }).then((response) => response.json()).then((data) => {
                    const processed_data = convertDataIntoArray(data.values)
                    setLocations(processed_data)
                    setLocation(processed_data[0].BuildingName)
                    setFirstLocation(processed_data[0].BuildingName)
                    setAwait(true)
                })

                    .catch((error) => console.error("Error:", error))
            }
        });
    }, []);

    function PopUpDelete(props) {
        const ID = props.id
        const location = props.location
        const startTime = props.startTime
        const endTime = props.endTime

        function closePopUp(close) {
            const sqlCommand = "DELETE FROM events WHERE EventID = '" + ID + "'";

            const postParameters = {
                sql: sqlCommand
            }

            fetch('http://localhost:4567/get-sql-rs', {
                method: 'POST',
                body: JSON.stringify(postParameters),
                headers: { 'Access-Control-Allow-Origin': '*' },
            }).then(() => {
                let newData = []
                for (let i = 0; i < data.length; i++) {
                    if (data[i].EventID !== ID) {
                        newData.push(data[i])
                    }
                }
                setData(newData);
                close();
            }).catch((error) => console.error("Error:", error))
        }

        return (
            <Popup trigger={<div>{location}</div>} arrow={false} position="top left">
                {close => (
                    <div className="editSchedulePopUpView">
                        <div className="editSchedulePopUp">
                            <p className="schedulePopUpHeaderText">{location}</p>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <p className="schedulePopUpHeaderTime">{UTCTo12Hr(startTime)} to {UTCTo12Hr(endTime)}</p>
                            </div>
                            <div className="schedulePopUpButtons">
                                <div className="schedulePopUpButton" onClick={() => { closePopUp(close) }} >Delete</div>
                            </div>
                            <a className="close" onClick={close}>
                                <IoCloseCircleSharp size={30} />
                            </a>
                        </div>
                    </div>
                )}
            </Popup>
        );
    }

    function getHours(startTime) {
        let time = startTime.split('T')
        let hour = time[1].split(':')[0]
        if (hour[0] === "0") {
            return parseInt(hour[1])
        }
        return hour
    }

    function getMinutes(startTime) {
        let time = startTime.split('T')
        let time_processed = time[1].split(':')[1]
        let minutes = time_processed.split('Z')[0]
        if (minutes[0] === "0") {
            return parseInt(minutes[1])
        }
        return parseInt(minutes)
    }

    function setEvents(data) {
        const location = data.BuildingName;
        const day = data.DaysOfWeek;
        const startTime = data.StartTime;
        const endTime = data.EndTime;
        const eventID = data.EventID;

        var startDate = Date.parse(startTime)
        var endDate = Date.parse(endTime)

        //number of minutes
        const heightOfEvent = Math.abs((endDate - startDate) / 60000);

        //start of event
        const startTimeHour = getHours(startTime)
        const startTimeMinutes = getMinutes(startTime)

        //start of event in pixels
        const startOfEvent = (startTimeHour * 60) + startTimeMinutes

        //each column is 118.5px wide
        const daysMap = new Map();
        daysMap.set("Sunday", 17)
        daysMap.set("Monday", 135.5)
        daysMap.set("Tuesday", 254)
        daysMap.set("Wednesday", 372.5)
        daysMap.set("Thursday", 491)
        daysMap.set("Friday", 609.5)
        daysMap.set("Saturday", 728)

        //the schedule is 1440px long. 1 pixel = 1 minute
        let styles = {
            scheduleViewEvent: {
                position: "absolute",
                top: startOfEvent + "px",
                left: daysMap.get(day) + "px",
                height: heightOfEvent + "px",
                lineHeight: heightOfEvent + "px",
                overflow: "hidden",
                maxWidth: "100px",
                background: "#FFFFFF",
                border: "2px solid #5393C6",
                borderRadius: "10px",
                fontFamily: "Playfair Display",
                color: "#5393C6",
                textAlign: "center",
                backgroundColor: "white",
                cursor: "pointer",
                overflow: "auto"
            }
        }
        return (
            <div>
                <div style={styles.scheduleViewEvent}>
                    <PopUpDelete
                        location={location} id={eventID} startTime={startTime} endTime={endTime}
                    />
                </div>
            </div>
        );
    }

    function selectDay(event) {
        const day = event.target.innerHTML

        switch (day) {
            case "Monday":
                if (monday) {
                    setMonday(false);
                } else {
                    setMonday(true);
                }
                break;
            case "Tuesday":
                if (tuesday) {
                    setTuesday(false);
                } else {
                    setTuesday(true);
                }
                break;
            case "Wednesday":
                if (wednesday) {
                    setWednesday(false);
                } else {
                    setWednesday(true);
                }
                break;
            case "Thursday":
                if (thursday) {
                    setThursday(false);
                } else {
                    setThursday(true);
                }
                break;
            case "Friday":
                if (friday) {
                    setFriday(false);
                } else {
                    setFriday(true);
                }
                break;
            case "Saturday":
                if (saturday) {
                    setSaturday(false);
                } else {
                    setSaturday(true);
                }
                break;
            case "Sunday":
                if (sunday) {
                    setSunday(false);
                } else {
                    setSunday(true);
                }
                break;
            default:
                break;
        }
    }

    function getHoursFrom24Hr(startTime) {
        startTime = convertTime(startTime)
        let hour = startTime.split(':')[0]
        if (hour[0] === "0") {
            return parseInt(hour[1])
        }
        return hour
    }

    function getMinutesFrom24Hr(time) {
        time = convertTime(time)
        let time_processed = time.split(':')[1]
        let minutes = time_processed.split(' ')[0]
        if (minutes[0] === "0") {
            return parseInt(minutes[1])
        }
        return parseInt(minutes)
    }

    function startIsLessThanEnd(startDate, endDate) {
        const start = getHoursFrom24Hr(startDate) * 60 + getMinutesFrom24Hr(startDate)
        const end = getHoursFrom24Hr(endDate) * 60 + getMinutesFrom24Hr(endDate)
        if (start >= end) {
            return false;
        }
        return true;
    }

    function addToSchedule() {
        let newData = data.slice()
        if (location.length !== 0 && startTime.length !== 0 && endTime.length !== 0) {
            if (startIsLessThanEnd(startTime, endTime)) {
                let formattedStartTime = "2020-01-01T" + convertTime(startTime) + "Z";
                let formattedEndTime = "2020-01-01T" + convertTime(endTime) + "Z";
                let sqlCommands = []
                const eventIDNow = Date.now()

                if (monday) {
                    newData.push({ BuildingName: location, DaysOfWeek: "Monday", EndTime: formattedEndTime, EventID: eventIDNow, StartTime: formattedStartTime, UserID: currentUserID })
                    sqlCommands.push("INSERT INTO events VALUES (" + "'" + currentUserID + "','" + location + "','" + formattedStartTime + "','" + formattedEndTime + "','" + "Monday" + "','" + eventIDNow + "');")
                }
                if (tuesday) {
                    newData.push({ BuildingName: location, DaysOfWeek: "Tuesday", EndTime: formattedEndTime, EventID: eventIDNow, StartTime: formattedStartTime, UserID: currentUserID })
                    sqlCommands.push("INSERT INTO events VALUES (" + "'" + currentUserID + "','" + location + "','" + formattedStartTime + "','" + formattedEndTime + "','" + "Tuesday" + "','" + eventIDNow + "');")
                }
                if (wednesday) {
                    newData.push({ BuildingName: location, DaysOfWeek: "Wednesday", EndTime: formattedEndTime, EventID: eventIDNow, StartTime: formattedStartTime, UserID: currentUserID })
                    sqlCommands.push("INSERT INTO events VALUES (" + "'" + currentUserID + "','" + location + "','" + formattedStartTime + "','" + formattedEndTime + "','" + "Wednesday" + "','" + eventIDNow + "');")
                }
                if (thursday) {
                    newData.push({ BuildingName: location, DaysOfWeek: "Thursday", EndTime: formattedEndTime, EventID: eventIDNow, StartTime: formattedStartTime, UserID: currentUserID })
                    sqlCommands.push("INSERT INTO events VALUES (" + "'" + currentUserID + "','" + location + "','" + formattedStartTime + "','" + formattedEndTime + "','" + "Thursday" + "','" + eventIDNow + "');")
                }
                if (friday) {
                    newData.push({ BuildingName: location, DaysOfWeek: "Friday", EndTime: formattedEndTime, EventID: eventIDNow, StartTime: formattedStartTime, UserID: currentUserID })
                    sqlCommands.push("INSERT INTO events VALUES (" + "'" + currentUserID + "','" + location + "','" + formattedStartTime + "','" + formattedEndTime + "','" + "Friday" + "','" + eventIDNow + "');")
                }
                if (saturday) {
                    newData.push({ BuildingName: location, DaysOfWeek: "Saturday", EndTime: formattedEndTime, EventID: eventIDNow, StartTime: formattedStartTime, UserID: currentUserID })
                    sqlCommands.push("INSERT INTO events VALUES (" + "'" + currentUserID + "','" + location + "','" + formattedStartTime + "','" + formattedEndTime + "','" + "Saturday" + "','" + eventIDNow + "');")
                }
                if (sunday) {
                    newData.push({ BuildingName: location, DaysOfWeek: "Sunday", EndTime: formattedEndTime, EventID: eventIDNow, StartTime: formattedStartTime, UserID: currentUserID })
                    sqlCommands.push("INSERT INTO events VALUES (" + "'" + currentUserID + "','" + location + "','" + formattedStartTime + "','" + formattedEndTime + "','" + "Sunday" + "','" + eventIDNow + "');")
                }

                for (let i = 0; i < sqlCommands.length; i++) {
                    const postParameters = {
                        sql: sqlCommands[i]
                    }
                    fetch('http://localhost:4567/get-sql-rs', {
                        method: 'POST',
                        body: JSON.stringify(postParameters),
                        headers: { 'Access-Control-Allow-Origin': '*' },
                    }).then(() => { }).catch((error) => console.error("Error:", error))
                }
                setData(newData)
                setMonday(false)
                setTuesday(false)
                setWednesday(false)
                setThursday(false)
                setFriday(false)
                setSaturday(false)
                setSunday(false)
                setStartTime(startTime)
                setEndTime(endTime)
                setLocation(location)
            } else {
                window.alert("Start time is at or after end time.")
            }
        } else {
            window.alert("Some fields were not selected.")
        }
    }

    return (
        <div className="main-page-body">
            {!wait &&
                <div></div>
            }
            {wait &&

                <div className="schedule">
                    <div className="schedule-addtoschedule-box">
                        <p className="schedule-header">Add To Schedule</p>
                        <p className="schedule-subtitle">Location</p>
                        <select name="locations" id="locations" className="schedule-dropdown" onChange={(e) => { setLocation(e.target.value) }}>
                            {locations.map((location) => (
                                <option key={location.PropertyCode} value={location.BuildingName}>{location.BuildingName}</option>
                            ))}
                        </select>
                        <p className="schedule-subtitle">Day of the Week</p>
                        <div style={{ marginBottom: "10px", marginTop: "-10px" }}>
                            <div className="row">
                                <div className="column">
                                    <div className={monday ? "schedule-day-button-selected" : "schedule-day-button"} onClick={(e) => { selectDay(e) }}>Monday</div>
                                    <div className={tuesday ? "schedule-day-button-selected" : "schedule-day-button"} onClick={(e) => { selectDay(e) }}>Tuesday</div>
                                    <div className={wednesday ? "schedule-day-button-selected" : "schedule-day-button"} onClick={(e) => { selectDay(e) }}>Wednesday</div>
                                    <div className={thursday ? "schedule-day-button-selected" : "schedule-day-button"} onClick={(e) => { selectDay(e) }}>Thursday</div>
                                </div>
                                <div className="column">
                                    <div className={friday ? "schedule-day-button-selected" : "schedule-day-button"} onClick={(e) => { selectDay(e) }}>Friday</div>
                                    <div className={saturday ? "schedule-day-button-selected" : "schedule-day-button"} onClick={(e) => { selectDay(e) }}>Saturday</div>
                                    <div className={sunday ? "schedule-day-button-selected" : "schedule-day-button"} onClick={(e) => { selectDay(e) }}>Sunday</div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="column">
                                <p className="schedule-subtitle-flex">Start Time</p>
                                <select name="startTimes" id="startTimes" className="schedule-dropdown-time" value={startTime} onChange={(e) => { setStartTime(e.target.value) }}>
                                    {times.map((time) => (
                                        <option key={time} value={time}>{time}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="column">
                                <p className="schedule-subtitle-flex">End Time</p>
                                <select name="endTimes" id="endTimes" className="schedule-dropdown-time" value={endTime} onChange={(e) => { setEndTime(e.target.value) }}>
                                    {times.map((time) => (
                                        <option key={time} value={time}>{time}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="schedule-add-button" onClick={() => { addToSchedule() }}>Add</div>
                    </div>
                    <div className="schedule-box">
                        <p className="schedule-header">My Schedule</p>
                        <div className="schedule-view-content">
                            <div className="schedule-view-days">
                                <div className="schedule-view-day">Sunday</div>
                                <div className="schedule-view-day">Monday</div>
                                <div className="schedule-view-day">Tuesday</div>
                                <div className="schedule-view-day">Wednesday</div>
                                <div className="schedule-view-day">Thursday</div>
                                <div className="schedule-view-day">Friday</div>
                                <div className="schedule-view-day">Saturday</div>
                            </div>
                            <div className="schedule-view-body">
                                <div className="schedule-view-time">
                                    {scheduleTimes.map((time) => (
                                        <p key={time} className="schedule-time-style">{time}</p>
                                    ))}
                                </div>
                                <div className="schedule-view-grid" id="grid">
                                    {Array.from({ length: 168 }, (_, i) => <div className="schedule-view-line"></div>)}
                                </div>
                                <div className="schedule-view-inputs">
                                    {data.map(function (item) {
                                        return (setEvents(item))
                                    })}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            }
        </div>
    );
}

export default Schedule;
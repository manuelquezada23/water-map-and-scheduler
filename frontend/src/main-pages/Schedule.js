import React, { useState } from 'react';

const times = [
    "12:00AM", "12:30AM", "01:00AM", "01:30AM", "02:00AM", "02:30AM", "03:00AM", "03:30AM", "04:00AM", "04:30AM", "05:00AM", "05:30AM", "06:00AM",
    "06:30AM", "07:00AM", "07:30AM", "08:00AM", "08:30AM", "09:00AM", "09:30AM", "10:00AM", "10:30AM", "11:00AM", "11:30AM", "12:00PM", "12:30PM",
    "01:00PM", "01:30PM", "02:00PM", "02:30PM", "03:00PM", "03:30PM", "04:00PM", "04:30PM", "05:00PM", "05:30PM", "06:00PM", "06:30PM", "07:00PM",
    "07:30PM", "08:00PM", "08:30PM", "09:00PM", "09:30PM", "10:00PM", "10:30PM", "11:00PM", "11:30PM"
]

const scheduleTimes = [
    "12:00AM", "01:00AM", "02:00AM", "03:00AM", "04:00AM", "05:00AM", "06:00AM",
    "07:00AM", "08:00AM", "09:00AM", "10:00AM", "11:00AM", "12:00PM", "01:00PM",
    "02:00PM", "03:00PM", "04:00PM", "05:00PM", "06:00PM", "07:00PM", "08:00PM",
    "09:00PM", "10:00PM", "11:00PM"
]

function Schedule() {
    const [monday, setMonday] = useState(false)
    const [tuesday, setTuesday] = useState(false)
    const [wednesday, setWednesday] = useState(false)
    const [thursday, setThursday] = useState(false)
    const [friday, setFriday] = useState(false)
    const [saturday, setSaturday] = useState(false)
    const [sunday, setSunday] = useState(false)

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

    function addToSchedule() {

    }

    return (
        <div className="main-page-body">
            <div className="schedule">
                <div className="schedule-addtoschedule-box">
                    <p className="schedule-header">Add To Schedule</p>
                    <p className="schedule-subtitle">Location</p>
                    <select name="locations" id="locations" className="schedule-dropdown">
                        <option value="location1">Location 1</option>
                        <option value="location2">Location 2</option>
                        <option value="location3">Location 3</option>
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
                            <select name="startTimes" id="startTimes" className="schedule-dropdown-time">
                                {times.map((time) => (
                                    <option value={time}>{time}</option>
                                ))}
                            </select>
                        </div>
                        <div className="column">
                            <p className="schedule-subtitle-flex">End Time</p>
                            <select name="endTimes" id="endTimes" className="schedule-dropdown-time">
                                {times.map((time) => (
                                    <option value={time}>{time}</option>
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
                                    <p>{time}</p>
                                ))}
                            </div>
                            <div className="schedule-view-grid">
                                {Array.from({ length: 168 }, (_, i) => <div className="schedule-view-line"></div>)}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Schedule;
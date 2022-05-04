import React, { useState } from 'react';

const times = [
    "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00", "05:30", "06:00",
    "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00",
    "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
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
                    <div className="schedule-add-button" onClick={() => {addToSchedule()}}>Add</div>
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Schedule;
import React from 'react';
import CalendarForm from './CalendarForm';
import CalendarList from './CalendarList';
import CalendarAPI from '../CalendarAPI';
import './Calendar.css'

const meetingsDB = new CalendarAPI();

class Calendar extends React.Component {
    state = {
        meetings: []
    }

    componentDidMount() {
        this.loadMeetings()
    }

    loadMeetings() {
        meetingsDB.loadDataAPI()
            .then(items=>this.setState({meetings: items}))
    }
    
    addMeeting = (data) => {
        meetingsDB.addDataAPI(data)
            .then(()=>this.loadMeetings())
            .catch(err => console.log(err))
    }

    deleteMeeting = (item) => {
        const {id} = item;
        meetingsDB.removeData(id)
            .then(()=>this.loadMeetings())
            .catch(err => console.log(err))
    }

    render() {
        return(
            <div className="calendar-box">
                <h2 className="title"> Terminarz spotkań </h2>
                <CalendarForm items = {this.state.meetings} onSubmit={this.addMeeting}/>
                <CalendarList onClick={this.deleteMeeting} items ={this.state.meetings}/>
            </div>
        )
    }
}

export default Calendar;
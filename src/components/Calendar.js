import React from 'react';
import CalendarForm from './CalendarForm';
import CalendarList from './CalendarList';
import CalendarAPI from '../CalendarAPI';

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
        console.log(id)
        meetingsDB.removeData(id)
        .then(()=>this.loadMeetings())
        .catch(err => console.log(err))
    }

    render() {
        return(
            <>
                <h3 className="title"> Kreator spotkań </h3>
                <CalendarForm items = {this.state.meetings} onSubmit={this.addMeeting}/>
                <CalendarList onClick={this.deleteMeeting} items ={this.state.meetings}/>
            </>
        )
    }
}

export default Calendar;
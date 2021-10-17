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
        meetingsDB.loadData()
            .then(items=>this.setState({meetings: items}))
    }
    
    addMeeting(data) {
        meetingsDB.addDataAPI(data)
    }

    render() {
        return(
            <>
                <CalendarForm onSubmit={this.addMeeting}/>
                <CalendarList items ={this.state.meetings}/>
            </>
        )
    }
}

export default Calendar;
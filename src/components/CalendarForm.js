import React from 'react';

class CalendarForm extends React.Component {
    state = {
        meeting: {}
    }

    handleForm = (e) => {
        e.preventDefault();
        this.setState(()=>{
            const details = {
                firstName: "Gosia",
                lastName: "Kowacka",
                email: "jan@kowalski.not",
                date: "2022-10-01",
                time: "11:00",
            }
            return {meeting: details}
        });
        this.addMeeting(this.state.meeting)
    }


    addMeeting(data) {
        this.props.onSubmit(data)
    }
    
    render() {
        
        return(
            <form onSubmit = {(e)=> this.handleForm(e)}>
                <input placeholder="Imię"/>
                <input placeholder="Nazwisko"/>
                <input placeholder="email" type="email"/>
                <input type="date"/>
                <input type="time"/>
                <input type="submit"/>
            </form>
        )
}
}

export default CalendarForm;
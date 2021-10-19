import React from 'react';

class CalendarForm extends React.Component {
    state = {
        meeting: {},
        errors:[]
    }

    handleInput = (e) => {
        console.log('changed')
        const {value, name} = e.target;
        this.setState(()=> {
            return {meeting:{...this.state.meeting, [name]: value} }
        })
    }

    handleForm = async (e) => {
        e.preventDefault();
        this.setState({errors:[]});
        const meeting = {
            firstName: await this.validateName(e.target.firstName.value),
            lastName: await this.validateName(e.target.lastName.value),
            email: await this.validateEmail(e.target.email.value),
            date: await this.validateDate(e.target.date.value),
            time: await this.validateTime(e.target.time.value),
        }
        this.addMeeting(meeting)
    }

    addMeeting = (item) => {
        const {firstName, lastName, email, date, time} = item;
        if (firstName && lastName && email && date && time && this.state.errors.length===0) {
            this.props.onSubmit(item);
            this.setState({meeting:{}})
            } else alert(this.state.errors)
    }

    validateName(name) {
        if (name.length <3) {
            this.setState({errors: [...this.state.errors, 'First and last name should consist of more than 3 characters']})
        } else {return name}
    }

    validateEmail(email) {
        const reg = /@/;
        if (reg.test(email)) {return email} else {this.setState({errors: [...this.state.errors, 'Invalid email']})}
    }

    validateDate(date) {
        const reg = /(20[0-9]{2})-(0[1-9]|1[0-2])-(0[0-9]|[12][0-9]|3[01])/;
        if (reg.test(date)) {return date} else {this.setState({errors: [...this.state.errors, 'Invalid date']})}
    }

    validateTime(time) {
        const reg = /([01][0-9]|2[0-3]):([012345][0-9])/;
        if (reg.test(time)) {return time} else {this.setState({errors: [...this.state.errors, 'Invalid time']})}
    }
    
    render() {
        return(
            // <section className="form"> </section>
            <form onSubmit = {(e)=> this.handleForm(e)}>
                <input placeholder="Imię" name="firstName" onChange={(e) => this.handleInput(e)}/>
                <input placeholder="Nazwisko" name = "lastName" onChange={(e) => this.handleInput(e)}/>
                <input type="email" placeholder="email" name = "email" onChange={(e) => this.handleInput(e)}/>
                <input type="date" name="date" onChange={(e) => this.handleInput(e)}/>
                <input type="time" name = "time" onChange={(e) => this.handleInput(e)}/>
                <input type="submit"/>
            </form>
        )
}
}

export default CalendarForm;
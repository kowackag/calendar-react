import React from 'react';
import {v4 as uuid} from 'uuid';
import './CalendarForm.css';

class CalendarForm extends React.Component {
    state = {
        meeting: {
            firstName:'',
            lastName: '',
            email: '',
            date: '',
            time: ''
        },
        prompts:[]
    }

    handleInput = (e) => {
        this.findMeetingForSuggestion(e.target);
        const {value, name} = e.target;
        this.setState(()=> {
            return {meeting:{...this.state.meeting, [name]: value} }
        })
    }

    handleForm = (e) => {
        e.preventDefault();
        const meeting = {
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            email: e.target.email.value,
            date: e.target.date.value,
            time: e.target.time.value,
        } 
        if (this.validateData(meeting)) {
            this.addMeeting(meeting);
        }
    }

    addMeeting = async (item) => {
        await this.props.onSubmit(item);
        this.setState({meeting:{
            firstName:'',
            lastName: '',
            email: '',
            date: '',
            time: ''
        }})
    }

    findMeetingForSuggestion(item) {
       this.setState({prompts: []})
       const {name, value} = item;
       const regex = new RegExp(value, 'gi');
       const {items} = this.props;
       if (value) {
        const prompts = items.filter((item) => item[name].match(regex));
        const copyPrompts = prompts.map(item => {return {...item, id: uuid()}})
        this.setState({prompts: copyPrompts})
       }
    } 

    autocomplete = ({firstName, lastName, email}) => {
       this.setState({
            meeting: {firstName:firstName, lastName: lastName, email: email },
            prompts:[]
        })
    }

    validateData(data) {
        const {firstName, lastName, email, date, time} = data;
        const errors = [];

        if (firstName.length <3) { errors.push('First name should consist of more than 3 characters')} 
        if (lastName.length <3) { errors.push('Last name should consist of more than 3 characters')} 
      
        const regEmail = /@/;
        if (!regEmail.test(email)) {errors.push('Invalid email') }

        const regDate = /(20[0-9]{2})-(0[1-9]|1[0-2])-(0[0-9]|[12][0-9]|3[01])/;
        if (!regDate.test(date)) {errors.push('Invalid date')}
    
        const regTime = /([01][0-9]|2[0-3]):([012345][0-9])/;
        if (!regTime.test(time)) {errors.push('Invalid time')}

        if (errors.length>0) {
            alert(errors);
            return false
        } else { 
            return true}
    }

    render() {
        return(
            <section className="creator"> 
                <form className="creator__form form" onSubmit = {(e)=> this.handleForm(e)}>
                    <input className="input" placeholder="Imię" name="firstName" value={this.state.meeting.firstName} onChange={(e) => this.handleInput(e)} />
                    <input className="input" placeholder="Nazwisko" name = "lastName" value={this.state.meeting.lastName} onChange={(e) => this.handleInput(e)}/>
                    <input className="input" type="email" placeholder="email" name = "email" value={this.state.meeting.email} onChange={(e) => this.handleInput(e)}/>
                    <div className="input__time-container"><input className="input__time input" type="date" name="date" onChange={(e) => this.handleInput(e)}/>
                    <input className="input__time input" type="time" name = "time" onChange={(e) => this.handleInput(e)}/></div>
                    <input className="input creator__btn" type="submit" value ="Dodaj spotkanie"/> 
                </form>
                <ul className = "prompt"> 
                    {this.state.prompts.map((item) => <li key={item.id} className = "prompt__item" onClick={()=>this.autocomplete(item)}>{`${item.firstName} ${item.lastName} (${item.email})`}</li> )}
                </ul>
            </section>
        )
    }
}

export default CalendarForm;
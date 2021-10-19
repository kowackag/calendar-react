import React from 'react';
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
        errors:[],
        prompts:[]
    }

    handleInput = (e) => {
        this.findMeeting(e.target);
        const {value, name} = e.target;
        this.setState(()=> {
            return {meeting:{...this.state.meeting, [name]: value} }
        })
    }

    handleForm = async (e) => {
        e.preventDefault();
        await this.setState({errors:[]});
        const meeting = {
            firstName: await this.validateName(e.target.firstName.value),
            lastName: await this.validateName(e.target.lastName.value),
            email: await this.validateEmail(e.target.email.value),
            date: await this.validateDate(e.target.date.value),
            time: await this.validateTime(e.target.time.value),
        }
        this.addMeeting(meeting);

    }

    addMeeting = (item) => {
        const {firstName, lastName, email, date, time} = item;
        if (firstName && lastName && email && date && time && this.state.errors.length === 0) {
            this.props.onSubmit(item);
            this.setState({meeting:{
                firstName:'',
                lastName: '',
                email: '',
                date: '',
                time: ''
            }})
            } else alert(this.state.errors)
    }

    findMeeting(item) {
       this.setState({prompts: []})
       const {name, value} = item;
       const regex = new RegExp(value, 'gi');
       const {items} = this.props;
       if (value) {
        const prompts = items.filter((item) => item[name].match(regex));
        this.setState({prompts: prompts})
       }
    } 

    autocomplete = ({firstName, lastName, email}) => {
       this.setState({
            meeting: {firstName:firstName, lastName: lastName, email: email },
            prompts:[]
        })
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
                    {this.state.prompts.map((item) => <li className = "prompt__item" onClick={()=>this.autocomplete(item)}>{`${item.firstName} ${item.lastName} (${item.email})`}</li> )}
                </ul>
            </section>
        )
    }
}

export default CalendarForm;
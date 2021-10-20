import React from 'react';
import './CalendarItem.css'

export default class CalendarItem extends React.Component {
    
    render() {
     const {item} = this.props;
     const {firstName, lastName, email, date, time} = item;
     return (
        <li className="meeting">
            <div className ="meeting-info"> 
                <h3 className="meeting__name" >{`${firstName} ${lastName}`}</h3> 
                <a className="meeting__email" href={`mailto:${email}`}>{email}</a>
                <time className="meeting__time">{`${date} godz. ${time}`}</time>
            </div>
            <button className="btn" onClick={() =>{this.props.onClick(item)}}>Usuń</button>
        </li>)
 }
}
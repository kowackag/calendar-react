import React from 'react';

export default class CalendarItem extends React.Component {
    
 render() {
     const {item} = this.props;
     const {firstName, lastName, email, date, time} = item;
     return (
        <li>
         <h2>{`${firstName} ${lastName}`}</h2> 
         <p>{email}</p>
         <time>{`${date} godz. ${time}`}</time>
        </li>)
 }
}
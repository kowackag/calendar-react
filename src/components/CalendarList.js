import React from 'react';
import CalendarItem from './CalendarItem';
import './CalendarList.css'

function CalendarList (props)  {

    const {onClick, items} = props;

     return (
            <ul className="meeting-list">
                {items.map((item)=><CalendarItem onClick={onClick} key={item.id} item={item}/>)} 
            </ul>
    )
}

export default CalendarList;
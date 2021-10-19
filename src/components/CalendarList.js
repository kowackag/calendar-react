import React from 'react';
import CalendarItem from './CalendarItem';

function CalendarList (props)  {
    
    const {onClick, items} = props;

     return (
            <ul>{items.map((item)=><CalendarItem onClick={onClick} key={item.id} item={item}/>)} </ul>
        )
}

export default CalendarList;
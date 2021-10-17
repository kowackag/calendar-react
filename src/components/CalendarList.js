import React from 'react';
import CalendarItem from './CalendarItem';

export default class CalendarList extends React.Component {

    render() {
        return (
            <ul>{this.props.items.map((item)=><CalendarItem item={item}/>)} </ul>
        )
    }
}
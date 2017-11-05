import React, { Component } from 'react';
import { getPixelWidth } from '../utility';
/*
this class is for rendering the top bar ir current time and last hour of the day 12 pm is denoted by 0
 */
class TimeHeader extends Component {

    render() {
        const styles = { width : getPixelWidth(60)}
       return(
           <span style={{ border:'2px solid #000',display:'inline-block',width: styles.width }}>{this.props.startDate} - {this.props.endDate}</span>
       )
    }
}
export default TimeHeader;
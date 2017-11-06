import React, { Component } from 'react';
import { getPixelWidth } from '../utility';
/*
this class is for rendering the top bar ir current time and last hour of the day 12 pm is denoted by 0
 */
class TimeHeader extends Component {

    render() {
        const styles = { width : getPixelWidth(60)}
       return(
           <div style={{width: styles.width }}>
           				<span>{this.props.startDate}:00</span>  <span>{this.props.endDate}:00</span>
           </div>
       )
    }
}
export default TimeHeader;

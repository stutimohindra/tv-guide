import React, { Component } from 'react';
import { getPixelWidth } from '../utility';
class ChannelEventDetail extends Component{

    render(){
        const details = this.props;

        return(
           <div key={details.displayDuration} style={{border:'2px solid #000' }}>
               {details.eventName}
               <div>{' '}{details.startTime}-{details.endTime}</div>
           </div>
        )
    }
}
export default ChannelEventDetail;
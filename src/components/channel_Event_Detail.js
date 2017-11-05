import React, { Component } from 'react';
import { Popover } from 'react-bootstrap';
/*
This class is the child class of channel_list_item and describes the events of each channel
 */
class ChannelEventDetail extends Component{
    constructor(){
        super();
        this.state = {
            clicked: false,
        };
    }
    handleHover=()=>{
        this.setState({ clicked : !this.state.clicked })
    }

    render(){
        const details = this.props;
        return(
           <div key={details.displayDuration} style={{border:'2px solid #000' }} onClick={()=>{this.handleHover()}}>
               {details.eventName}
               <div>{' '}{details.startTime}-{details.endTime}</div>
               {this.state.clicked ?
                   <Popover id="popover-positioned-top" title={details.subGenre} style={{ overflowX:'auto' }}>
                   <strong>{details.shortSynopsis}</strong>{details.actors}
                   </Popover> :
                   <div/>}
           </div>
        )
    }
}
export default ChannelEventDetail;
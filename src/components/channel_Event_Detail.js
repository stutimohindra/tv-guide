import React, { Component } from 'react';
import {
  setChannelInfo
} from '../actions/index';
import { connect } from 'react-redux';

/*
This class is the child class of channel_list_item and describes the events of each channel
 */
class ChannelEventDetail extends Component{
    constructor(){
        super();
        this.state = {
            clicked: false,
            clientX:0,
            clientY:0
        };
    }
    handleClick=(e)=>{
        this.props.setChannelInfo(this.props);
    }

    render(){
        const details = this.props;
        return(
           <div key={details.displayDuration}  onClick={this.handleClick.bind(this)}>
               <strong> {details.eventName}</strong>
               <div>{' '}{details.startTime}-{details.endTime}</div>

           </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        channelInfo: state.channelInfo,
    };
}

export default connect(mapStateToProps, {
  setChannelInfo,
})(ChannelEventDetail);

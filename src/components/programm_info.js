import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Modal,Button} from 'react-bootstrap';
import {
  setChannelInfo
} from '../actions/index';
class ProgrammInfo extends Component{
  render(){
    return(
      <div className="static-modal">
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>{this.props.channelInfo.eventName}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
          {this.props.channelInfo.shortSynopsis}
          <br/>
          <strong>Actors:</strong> {this.props.channelInfo.actors}
          <br/>
          <strong>Genre:</strong>{this.props.channelInfo.subGenre}
          </Modal.Body>

          <Modal.Footer>
          <Button onClick={()=>this.props.setChannelInfo({})}>Close</Button>
      </Modal.Footer>
    </Modal.Dialog>
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
})(ProgrammInfo);

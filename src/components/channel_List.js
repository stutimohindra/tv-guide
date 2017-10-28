import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    getChannelList,
    getChannelEvent,
    channelId,
    startDate,
    sorting,
    setSortOrder
    } from '../actions/index';
import ChannelListItem from './channel_List_Item';
import { Col,Row,Grid,Button } from 'react-bootstrap';

class ChannelList extends Component {

  componentDidMount(){
      this.props.getChannelList();
  }

  renderItem(channels) {
      if(channels !== undefined) {
          return (
              channels.map(object => {
                  return (
                      <ChannelListItem  key={object.channelId} channel = {object} />
                  )
              })
          )
      }
  }

  handleClick(e){
      debugger
      let sort = this.props.sortOrder
      let sortOrder;
        if(sort == 1){
            sortOrder = -1
            e.currentTarget.getElementsByTagName('img')[0].className = "down";
        }else{
            e.currentTarget.getElementsByTagName('img')[0].className = "up";
            sortOrder = 1
        }


     if(e.currentTarget.getAttribute('data-key') === 'channelStbNumber' ) {

         this.props.sorting(this.props.channels,'channelStbNumber',sortOrder)

     } else if(e.currentTarget.getAttribute('data-key') === 'channelTitle' ){

         this.props.sorting(this.props.channels,'channelTitle',sortOrder)
     }
  }

  render() {

       return (
           <Grid>
               <Row>
                  <Col md={4} sm={4}>
                      <Button className="sortBtn" data-key ='channelStbNumber' style={{ backgroundColor:'white',border:'2px solid #000'  }}
                              onClick={(e) => {this.handleClick(e)} }>
                          Number <span ><img className={(this.props.sortOrder == 1 ? 'up':'down')} id='numberImg' src="" alt="▲"/> </span>
                      </Button>
                      <Button  data-key ='channelTitle' style={{ backgroundColor:'white',border:'2px solid #000'  }}
                              onClick={(e) => {this.handleClick(e)} }>Name<img className={(this.props.sortOrder == 1 ? 'up':'down')} id='nameImg' src="" alt="▲"/> </Button>
                  </Col>
                  <Col md={8} sm={8}>

                  </Col>
               </Row>
               <Row>
                   <ul className="col-md-12 col-sm-12 list-group">
                    {this.renderItem(this.props.channels)}
                    </ul>
               </Row>
           </Grid>
        );
   }

}

function mapStateToProps(state) {
    return {
        channels: state.channels,
        channelEvent:state.channelEvent,
        channelId: state.channelId,
        startDate: state.startDate,
        sortKey: state.sortKey,
        sortOrder: state.sortOrder
    };
}

export default connect(mapStateToProps, {
    getChannelList,
    getChannelEvent,
    channelId,
    startDate,
    sorting,
    setSortOrder
})(ChannelList);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import {
    getChannelList,
    channelId,
    sorting,
    setSortOrder,
    getStartEndDate,
    getChannelEvent,
    setFacebookDetails,
    setPos
    } from '../actions/index';
import {getPixelWidth} from '../utility';
import ChannelListItem from './channel_List_Item';
import { Col,Row,Grid,Button } from 'react-bootstrap';
import moment from 'moment';
import TimeHeader from'./time_header'
import {debounce} from './../utility'
/*
This is the parent class and renders channel item and calculates the viewport and sends ids to getEvents api as well
 */
class ChannelList extends Component {
    constructor(){
        super();
        this.isInitialRender = true
    }
  componentDidMount(){

      this.props.getChannelList();
      this.props.getStartEndDate();
      // this.props.getfavourites(this.props.facebookId,this.props.name);
      window.addEventListener('scroll', debounce(this.onChannelRowUpdate.bind(this),250));
      window.addEventListener('resize', debounce(this.onChannelRowUpdate.bind(this),250));
      window.addEventListener('load', debounce(this.handleLoad.bind(this),250));
      window.fbAsyncInit = function () {
          FB.init({
              appId: '1985772575023712',
              cookie: true,
              xfbml: true,
              version: 'v2.1'
          });
          (function (d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) {
                  return;
              }
              js = d.createElement(s);
              js.id = id;
              js.src = "https://connect.facebook.net/en_US/sdk.js";
              fjs.parentNode.insertBefore(js, fjs);
          }(document, 'script', 'facebook-jssdk'));

      }
  }

  handleLoad(){
      setTimeout(this.onChannelRowUpdate.bind(this),3000);
  }

  isElementVisible = (el) => {
        let rect     = el.getBoundingClientRect(),
            vWidth   = window.innerWidth || doc.documentElement.clientWidth,
            vHeight  = window.innerHeight || doc.documentElement.clientHeight,
            efp      = function (x, y) { return document.elementFromPoint(x, y) };

        // Return false if it's not in the viewport
        if (rect.right < 0 || rect.bottom < 0
            || rect.left > vWidth || rect.top > vHeight)
            return false;

        // Return true if any of its four corners are visible
        return (
            el.contains(efp(rect.left,  rect.top))
            ||  el.contains(efp(rect.right, rect.top))
            ||  el.contains(efp(rect.right, rect.bottom))
            ||  el.contains(efp(rect.left,  rect.bottom))
        );
  }


  onChannelRowUpdate=()=>{

    let $channelRows = document.querySelectorAll('.childRow')

    let visibleChannels = []
     // find the ones in viewport
      $channelRows.forEach((target,idx)=>{

          if(this.isElementVisible(target)){

              visibleChannels.push(target.getAttribute('data-channel-id'))

          }

      })

      visibleChannels.join(',');

      this.props.getChannelEvent(visibleChannels,(this.props.startDate),(this.props.endDate));

    }

  renderItem(channels) {
      if(channels !== undefined) {
          return (
              channels.map(object => {
                  // let fav = false;
                  //
                  // if( this.props.favourites.indexOf(object.channelId) >= 0){
                  //     fav = true
                  // }
                  return (
                      <div key={object.channelId} ref={object.channelId} data-channel-id={object.channelId} className="childRow" >
                          <ChannelListItem
                              key={object.channelId}
                              channel = {object}
                              channelEvent={this.props.channelEvent[object.channelId]}
                          />
                      </div>
                  )
              })
          )
      }
  }

  renderTimeHeader(){
      let startDate = moment(this.props.startDate);
      let endDate = moment(this.props.endDate).utc();

      let duration = Math.round(moment.duration(endDate.diff(startDate)).asHours());
      let durationArray = [];
      for(let i = duration;i >= 0;i--) {
          durationArray.push(i)
      }
      return durationArray.map( object =>{
          return (
                <div className="item" key={object}  style={{border:'2px solid #000', width: getPixelWidth(60) ,left:-getPixelWidth(60)* this.props.currentPosition}}>
                    <TimeHeader key={object} startDate={startDate.get('hour')} endDate={parseInt((startDate).add(1, 'hours').format('HH'))}/>
                </div>
          )
      })
  }

  handleClick(e){

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

     this.onChannelRowUpdate();
  }
    onProgrammeScroll(ctr,ctx){

      return function(e){
          if(ctr >= 1){
              ctx.props.setPos(ctx.props.currentPosition +1);
          }else if(ctr <= -1){
              ctx.props.setPos(ctx.props.currentPosition - 1);
          }

      }

    }
    logout=()=>{
        FB.logout(function(response) {
            browserHistory.push('/login')
        });
    }
    header(){
        if(this.props.facebookId !== undefined){
            return(
                <div>
                <strong>Welcome {this.props.name}!</strong>
                <Button style={{ marginLeft:'74.5%',border:'2px solid #000'}} onClick={()=>this.logout()}>Logout</Button>
                </div>
            )
        }
    }

  render() {

      return (
           <Grid>
               {this.header()}
               <Row>
                   <Button onClick={this.onProgrammeScroll(-1,this)}>Left</Button>  <Button onClick={this.onProgrammeScroll(1,this)}>Right</Button>
               </Row>

               <Row>
                  <Col md={3} sm={3}>
                      <Button className="sortBtn" data-key ='channelStbNumber' style={{ backgroundColor:'white',border:'2px solid #000'  }}
                              onClick={(e) => {this.handleClick(e)} }>
                          Number <span ><img className={(this.props.sortOrder == 1 ? 'up':'down')} id='numberImg' src="" alt="▲"/> </span>
                      </Button>
                      <Button  data-key ='channelTitle' style={{ backgroundColor:'white',border:'2px solid #000'  }}
                              onClick={(e) => {this.handleClick(e)} }>Name<img className={(this.props.sortOrder == 1 ? 'up':'down')}
                              id='nameImg' src="" alt="▲"/> </Button>
                  </Col>
                  <Col md={9} sm={9}>
                      <Row style={{ border: '2px solid #000',width:'auto' }}>

                          <Col className="timeRow" style={{padding: 0}} >
                              <div className="eventRowWraper" style={{border:'2px solid #000' }}>
                                  {this.renderTimeHeader()}
                              </div>
                          </Col>

                      </Row>
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
        sortKey: state.sortKey,
        sortOrder: state.sortOrder,
        startDate: state.startDate,
        endDate: state.endDate,
        currentPosition: state.currentPosition,
        name:state.name,
        facebookId:state.facebookId,
    };
}

export default connect(mapStateToProps, {
    getChannelList,
    channelId,
    sorting,
    setSortOrder,
    getStartEndDate,
    getChannelEvent,
    setPos,
    setFacebookDetails
})(ChannelList);
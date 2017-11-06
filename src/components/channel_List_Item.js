import React, { Component } from 'react';
import { Col,Image,Row,Grid } from 'react-bootstrap';
import { connect } from 'react-redux';
import ChannelListItemDesc from './channel_list_item_desc';
import ChannelEventDetail from './channel_Event_Detail';
import { getPixelWidth } from '../utility';
import { browserHistory } from 'react-router';
import moment from 'moment';
import {
    getStartEndDate,
    getChannelEvent,
    setPos,
    insertFavourites,
    updateFav,
    getfavourites,
} from '../actions/index';
/*
This class renders if channel is fav or not,it is the parent class for events of the channel
 */

class ChannelListItem extends Component {

    constructor() {
        super();
        this.state = {
            clicked: false,
        };
    }

    componentDidMount(){

        this.props.channel;

    }

    renderEvents= (event) =>{
        if(event !== undefined) {
            return(
            event.map(object => {
                let eventEndAt = moment(new Date(object.displayDateTime));
                let eventDuration=0

                if (object.displayDuration.substring(0, 2) != '00') {
                    eventEndAt = moment(new Date(object.displayDateTime)).add(parseInt(object.displayDuration.substring(0, 2)), 'hour');
                    eventDuration = (parseInt(object.displayDuration.substring(0, 2)) *60 )
                }
                if (object.displayDuration.substring(3, 5) != '00') {
                    eventEndAt = moment(new Date(eventEndAt)).add(parseInt(object.displayDuration.substring(3, 5)), 'minutes');
                    eventDuration = eventDuration + parseInt(object.displayDuration.substring(3, 5))
                }
                eventEndAt = moment(new Date(eventEndAt)).format('HH:mm A');

                const styles = { width: getPixelWidth(eventDuration)}

                return (
                    <div key={object.eventID} className="event-item" style={{ width: styles.width ,left:-getPixelWidth(60)* this.props.currentPosition}}>
                     <ChannelEventDetail className="event-item"
                                         displayDuration={object.displayDuration}
                                         endTime={eventEndAt}
                                         startTime={moment(object.displayDateTime).format('HH:mm A')}
                                         eventName={object.programmeTitle}
                                         shortSynopsis = {object.shortSynopsis}
                                         subGenre = {object.subGenre}
                                         actors = {object.actors}
                     />
                    </div>

                )
            })
            )
        }

    }

    toggleImage=(channelId,isFav)=>{
        if(this.props.facebookId !== undefined && this.props.name !== undefined && !isFav) {
            this.props.insertFavourites(this.props.facebookId,this.props.name,channelId);
            this.props.getfavourites(this.props.facebookId,this.props.name)

        }else if(this.props.facebookId !== undefined && this.props.name !== undefined && isFav){
            this.props.updateFav(this.props.facebookId,this.props.name,channelId);
            this.props.getfavourites(this.props.facebookId,this.props.name)

        }else if(this.props.facebookId === undefined && this.props.name === undefined){
            return (
                browserHistory.push('/login')
            )
        }
    }

    handleClickFav = (channelId,e) =>{
        e.stopPropagation()
        let isFav = false
        if(this.props.favourites.indexOf(channelId) >= 0){
            isFav = true;
        }
        this.toggleImage(channelId,isFav);
    }

    handleClick= () => {
        this.setState({ clicked : !this.state.clicked })
    }

    handleChannelDesc =() =>{
        this.props.setHandleClickEvent(!this.props.isClickedEvent)
    }

    // checkLoggedIn =() =>{
    //
    //     if(this.props.facebookId !== undefined && this.props.name !== undefined ){
    //         return true;
    //     }else if(this.props.facebookId !== undefined && this.props.name !== undefined ) {
    //         return false;
    //     }else{
    //         return false;
    //     }
    // }
    isFavoruite=(channelId)=>{
      let isFav = false
      if(this.props.favourites.indexOf(channelId) >= 0){
          isFav = true;
      }
      return isFav;
    }

    render(){
        const channelInfo =  this.props.channel
            return (
                <div ref="rowRef" data-key={channelInfo.channelId}>
                    <Grid ref={(ref) => this.myTextInput = ref} >
                        <Row >
                            <Col className="channelInfo" md={2} sm={2}  onClick={() => this.handleClick()}>
                                <Row>
                                    <Image width="100" style={{ 'marginLeft': '20px'}} src={channelInfo.channelExtRef[8].value}/>
                                </Row>
                                <Row >
                                    <Col md={1} sm={1} >
                                        <div onClick={this.handleClickFav.bind(this,channelInfo.channelId)}>
                                            {
                                              this.props.facebookId !== undefined?
                                              (this.isFavoruite(channelInfo.channelId))?<img  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/WikiFont_uniE033_-_heart_-_red.svg/512px-WikiFont_uniE033_-_heart_-_red.svg.png" width="15" /> :<img  src="https://image.flaticon.com/icons/svg/60/60993.svg" width="10" />
                                              :<img  src="https://image.flaticon.com/icons/svg/60/60993.svg" width="10" />
                                            }
                                        </div>
                                    </Col>
                                    <Col  md={2} sm={2} className="channelInfo-number">
                                        {channelInfo.channelStbNumber}
                                    </Col>
                                    <Col className="channelInfo-name text-truncate" alt="{channelInfo.channelTitle}" md={8} sm={8}>
                                        {channelInfo.channelTitle}
                                    </Col>
                                </Row>
                            </Col>

                            <Col className="eventRow" style={{padding: 0}} md={10} sm={10} >
                                <div className="eventRowWraper">
                                    { this.props.channelEvent[channelInfo.channelId]? (this.renderEvents(this.props.channelEvent[channelInfo.channelId])) : <div/>}
                                </div>
                            </Col>

                        </Row>
                        <Row>
                            { this.state.clicked ? <ChannelListItemDesc key={channelInfo.channelId} channelDesc={channelInfo} handleClick={this.handleClick} /> : <div/> }
                        </Row>
                    </Grid>
                </div>

            )
    }
}

function mapStateToProps(state) {
    return {
        channelId: state.channelId,
        startDate: state.startDate,
        endDate: state.endDate,
        channelEvent:state.channelEvent,
        currentPosition: state.currentPosition,
        name: state.name,
        facebookId: state.facebookId,
        favourites: state.favourites,
    };
}

export default connect(mapStateToProps, {
    getStartEndDate,
    getChannelEvent,
    setPos,
    insertFavourites,
    updateFav,
    getfavourites,

})(ChannelListItem);

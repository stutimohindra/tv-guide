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
    getfavourites
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
        if(this.props.facebookId !== undefined && this.props.name !== undefined){
            this.props.getfavourites(this.props.facebookId,this.props.name);

        }

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
                    <div key={object.eventID} className="item" style={{border:'2px solid #000', width: styles.width ,left:-getPixelWidth(60)* this.props.currentPosition}}>
                     <ChannelEventDetail className="item"
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

    handleClickFav = (channelId) =>{
        let isFav = false
        console.log(this.props.favourites)
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

    checkLoggedIn =(channelId) =>{
        let isFav = false
        if(this.props.favourites.indexOf(channelId) >= 0){
            isFav = true;
        }
        if(this.props.facebookId !== undefined && this.props.name !== undefined && isFav){
            return (
                <Image className='fullHeart' style={{width: "15", height: '20'}} src="../../images/fullheart.png"/>
            )
        }else if(this.props.facebookId !== undefined && this.props.name !== undefined && !isFav) {
            return (
                <Image className='emptyHeart' style={{width: "15", height: '15'}} src="../../images/emptyheart.jpg"/>
            )
        }else{
            return (
                <Image className='emptyHeart' style={{width: "15", height: '15'}} src="../../images/emptyheart.jpg"/>
            )
        }
    }

    render(){
        const channelInfo =  this.props.channel
            return (
                <div ref="rowRef" data-key={channelInfo.channelId}>
                    <Grid ref={(ref) => this.myTextInput = ref}   style={{ border: "2px solid #000"}} >
                        <Row >
                            <Col  md={3} sm={3} style={{ border: "2px solid #000"}} onClick={() => this.handleClick()}>
                                <Row>
                                    <Image width="100" src={channelInfo.channelExtRef[8].value}/>
                                </Row>
                                <Row>
                                    <Col md={1} sm={1} >
                                        <div onClick={()=>this.handleClickFav(channelInfo.channelId)}>
                                            {this.checkLoggedIn(channelInfo.channelId)}
                                        </div>
                                    </Col>
                                    <Col  md={1} sm={1}>
                                        {channelInfo.channelStbNumber}
                                    </Col>
                                    <Col style={{ overflow: 'hidden', textOverflow: 'ellipsis' }} md={10} sm={10}>
                                        {channelInfo.channelTitle}
                                    </Col>
                                </Row>
                            </Col>

                            <Col className="eventRow" style={{padding: 0}} md={9} sm={9} >
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
    getfavourites
})(ChannelListItem);



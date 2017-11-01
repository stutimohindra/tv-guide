import React, { Component } from 'react';
import { Col,Image,Row,Grid } from 'react-bootstrap';
import { connect } from 'react-redux';
import ChannelListItemDesc from './channel_list_item_desc';
import ChannelEventDetail from './channel_Event_Detail';
import { getPixelWidth } from '../utility';
import moment from 'moment';
import {
    setChannelIdList,
    getStartEndDate,
    getChannelEvent,
    setPos,
} from '../actions/index';

class ChannelListItem extends Component {

    constructor() {
        //move to redux
        super();
        this.state = {
            clicked: false,
            pos:0.2
        };
    }

    componentDidMount(){

        this.props.channel;

    }

    renderEvents= (event) =>{
        if(event !== undefined) {
            return(
            event.map(object => {
                let eventEndAt;
                let eventDuration=0
                if (object.displayDuration.substring(0, 2) != '00') {
                    eventEndAt = moment(object.displayDateTime).add(parseInt(object.displayDuration.substring(0, 2)), 'hour');
                    eventDuration = (parseInt(object.displayDuration.substring(0, 2)) * 60)
                }
                if (object.displayDuration.substring(3, 5) != '00') {
                    eventEndAt = moment(object.displayDateTime).add(parseInt(object.displayDuration.substring(3, 5)), 'minutes');
                    eventDuration = eventDuration + parseInt(object.displayDuration.substring(3, 5))
                }
                eventEndAt = moment(eventEndAt).format('HH:mm A');

                const styles = { width: getPixelWidth(eventDuration)}




                return (
                    <div className="item" style={{border:'2px solid #000', width: styles.width ,left:-getPixelWidth(60)* this.props.currentPosition}}>

                     <ChannelEventDetail className="item" displayDuration={object.displayDuration} endTime={eventEndAt} startTime={moment(object.displayDateTime).format('HH:mm A')} eventName={object.programmeTitle}/>
                    </div>

                )
            })
            )
        }

    }

    handleClick= () => {
        this.setState({ clicked : !this.state.clicked })
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
                                    <Col md={1} sm={1}>
                                        <Image style={{ width:"15" }}  src="../../images/emptyheart.jpg"/>
                                    </Col>
                                    <Col  md={1} sm={1}>
                                        {channelInfo.channelStbNumber}
                                    </Col>
                                    <Col style={{ overflow: 'hidden', textOverflow: 'ellipsis' }} md={10} sm={10}>
                                        {channelInfo.channelTitle}
                                    </Col>
                                </Row>
                            </Col>

                            <Col className="eventRow" style={{padding: 0}} md={9} sm={9}>
                                <div className="eventRowWraper">
                                    { this.props.channelEvent[channelInfo.channelId]? (this.renderEvents(this.props.channelEvent[channelInfo.channelId])) : <div/>}
                                </div>
                            </Col>





                            {/*<Col className="eventRow" style={{padding: 0}} md={9} sm={9}>*/}
                                {/*<div className="eventRowWraper">*/}
                                    {/*<div className="item" style={{border:'2px solid #000', width: 120 }}>*/}
                                        {/*dfdsfdsf*/}
                                    {/*</div>*/}
                                    {/*<div className="item" style={{border:'2px solid #000', width: 33}}>*/}
                                        {/*dfdsfdsf*/}
                                    {/*</div>*/}
                                    {/*<div className="item" style={{border:'2px solid #000', width: 200 }}>*/}
                                        {/*dfdsfdsf*/}
                                    {/*</div>*/}
                                    {/*<div className="item" style={{border:'2px solid #000', width: 200 }}>*/}
                                        {/*dfdsfdsf*/}
                                    {/*</div>*/}
                                    {/*<div className="item" style={{border:'2px solid #000', width: 200}}>*/}
                                        {/*dfdsfdsf*/}
                                    {/*</div>*/}
                                    {/*<div className="item" style={{border:'2px solid #000', width: 200 }}>*/}
                                        {/*dfdsfdsf*/}
                                    {/*</div>*/}
                                {/*</div>*/}

                            {/*</Col>*/}




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
        currentPosition: state.currentPosition
    };
}

export default connect(mapStateToProps, {
    setChannelIdList,
    getStartEndDate,
    getChannelEvent,
    setPos
})(ChannelListItem);



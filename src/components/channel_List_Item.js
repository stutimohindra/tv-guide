import React, { Component } from 'react';
import { Col,Image,Row,Grid } from 'react-bootstrap';
import { connect } from 'react-redux';
import ChannelListItemDesc from './channel_list_item_desc';
import {
    setChannelIdList
} from '../actions/index';

class ChannelListItem extends Component {
    constructor() {
        //move to redux
        super();
        this.state = {
            clicked: false,
        };
    }
    getOffset=(element, target) =>{
     target  = target ? (target) : window;
    let offset = {top: element.offsetTop, left: element.offsetLeft},
        parent = element.offsetParent;
    while (parent != null && parent != target) {
        offset.left += parent.offsetLeft;
        offset.top  += parent.offsetTop;
        parent = parent.offsetParent;
    }
    return offset;
   }
    runTheTest=() => {
        let target  = this.refs.rowRef;

        if(this.isElementVisible(target)){
            console.log("inside visic",this.props)
            this.props.channelId
            //Fetch the chanels programmes
        }
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
    componentDidMount(){
        this.runTheTest();
        this.props.channel;
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

                            <Col md={9} sm={9}>
                                {/*channel info*/}

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
    };
}

export default connect(mapStateToProps, {
    setChannelIdList
})(ChannelListItem);



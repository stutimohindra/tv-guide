import React, { Component } from 'react';
import { Col,Button,Row,Grid,Image } from 'react-bootstrap';
/*
This class is for rendering the channel description based on channel id
 */

 const ChannelListItemDesc = (props) => {
    return(
        <Grid className="info" >
            <Row className="show-grid">
            <Col md={10} sm={10}>
                {props.channelDesc.channelDescription}
            </Col>
            <Col md={2} sm={2}>
                <Button bsStyle="danger" onClick={  props.handleClick }>Close</Button>
            </Col>
            </Row>
            <Row className="show-grid">
                <Col md={6} sm={6}>
                    {props.channelDesc.channelLanguage}
                </Col>
                <Col md={6} sm={6}>
                    {props.channelDesc.channelCategory}
                </Col>
            </Row>
        </Grid>
    )
}
export default ChannelListItemDesc;

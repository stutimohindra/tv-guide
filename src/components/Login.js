import React,{Component} from 'react'
import { Button, FormGroup } from "react-bootstrap";
import {setFacebookDetails,insertUser} from '../actions/index';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
/*
This class is for logging in with facebook on did mount the facebook api key is loaded and user is redirected to the next screen
 */

class Login extends Component {

    constructor() {
        super();
    }

    componentDidMount() {
        let self = this
        window.fbAsyncInit = function () {
            FB.init({
                appId: '1985772575023712',
                cookie: true,
                xfbml: true,
                version: 'v2.1'
            });

        FB.AppEvents.logPageView();
            FB.Event.subscribe('auth.statusChange', function(response) {
                if (response.authResponse) {
                    FB.api('/me', function(response) {
                        self.props.setFacebookDetails(response.name,response.id);
                        self.props.insertUser(response.name,response.id);
                        browserHistory.push(`/${response.name}/${response.id}`);
                    })
                } else {
                    console.log('User cancelled login or did not fully authorize.');
                }
            });
        }.bind(this);

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

    handleClick() {
        FB.login();
    }

    render() {

        return (
            <div className="well" style={{ maxWidth: 400, margin: '0 auto 10px',marginTop:'20%' }}>
                <strong style={{ paddingLeft: '37%'}}>LOGIN WITH</strong>
                <form >
                    <FormGroup controlId="email" bsSize="large" style={{ paddingLeft: '35%',paddingTop: '10%' }}>
                        <Button style={{ width: '50%'}}
                                bsStyle="primary" className="btn btn-block btn-social btn-facebook" onClick={()=>this.handleClick() }>
                            <span className="fa fa-facebook"></span> Facebook
                        </Button>
                    </FormGroup>
                </form>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        name: state.name,
        facebookId:state.facebookId,
        user:state.user,
    };
}

export default connect(mapStateToProps, {
    setFacebookDetails,
    insertUser
})(Login);

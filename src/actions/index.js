import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';
import fetch from 'isomorphic-fetch';
/*
All api's are called from this class
 */
export const FETCH_CHANNELS_SUCCESS = 'FETCH_CHANNELS_SUCCESS';
export const SET_CHANNEL_LIST_SUCCESS = 'SET_CHANNEL_LIST_SUCCESS';
export const FETCH_CHANNELS_EVENT_SUCCESS = 'FETCH_CHANNELS_EVENT_SUCCESS';
export const FETCH_SET_SORT_ORDER_SUCCESS = 'FETCH_SET_SORT_ORDER_SUCCESS';
export const CHANNEL_ID = 'CHANNEL_ID';
export const GET_DATES = 'GET_DATES';
export const FETCH_CHANNELS_ONSORT_SUCCESS = 'FETCH_CHANNELS_ONSORT_SUCCESS';
export const FETCH_SORT_ORDER_SUCCESS = 'FETCH_SORT_ORDER_SUCCESS';
export const POS_VALUE = 'POS_VALUE';
export const FACEBOOK_DETAILS = 'FACEBOOK_DETAILS';
export const FETCH_FAVOURITES = 'FETCH_FAVOURITES';
export const USER_INSERT_SUCCESS = 'USER_INSERT_SUCCESS';
export const USER_FAV_SUCCESS = 'USER_FAV_SUCCESS';
export const UPDATED_FAVOURITES ='UPDATED_FAVOURITES'

// get all channels
export const getChannelList = () => {
    return (dispatch) => {
        return axios.get(`http://ams-api.astro.com.my/ams/v3/getChannels`)
            .then(channels => {

                dispatch({
                    type: 'FETCH_CHANNELS_SUCCESS',
                    channels : channels.data.channel
                })
            })
    };
};
//get events against channel id
export const getChannelEvent = (channelId,startDate,endDate) => {
    let endpoint = `http://ams-api.astro.com.my/ams/v3/getEvents?channelId=${channelId}&periodStart=${startDate}&periodEnd=${endDate}`
    console.log(endpoint)
    return (dispatch) => {
        return axios.get(endpoint)
            .then( channelEvent => {
                let grouped = (_.groupBy(channelEvent.data.getevent, 'channelId'));

                dispatch({
                    type: 'FETCH_CHANNELS_EVENT_SUCCESS', channelEvent: grouped
                })
            })
    }
}
// return channel id
export function channelId(id) {
    return {
        type: CHANNEL_ID,
        channelId: channelId,
    }
}
//get start and end date of the day
export function getStartEndDate(){
    let startDate = moment(new Date()).format('YYYY-MM-DD HH:mm ');
    let endDate = moment().endOf('day').format('YYYY-MM-DD HH:mm');
    console.log("::",startDate,endDate)
    return {
        type: GET_DATES,
        startDate: startDate,
        endDate: endDate,
    }
}

//sorting on name or number
export function sorting(channels,sortKey,sortOrder) {
    let newList;
         newList = channels.sort((a, b) => {

            let aVal = a[sortKey].toLowerCase()
            let bVal = b[sortKey].toLowerCase()

            return aVal > bVal ? sortOrder : bVal > aVal ? -sortOrder : 0

        });

    return dispatch => {
        dispatch({
            type: 'FETCH_SORT_ORDER_SUCCESS',
            channels: newList,
            sortKey: sortKey,
            sortOrder: sortOrder
        })
    }
}
//sets sort order 1,-1 for name /number
export function setSortOrder(sortOrder, sortKey){
    // for level 3 will get from the db
    return dispatch => {
        dispatch ({
            type: 'FETCH_SET_SORT_ORDER_SUCCESS',
            sortOrder,
            sortKey,
        })
    }
}
//viewport depends on current position of cursor this function returns current pos
export function setPos(currentPosition){
    if(currentPosition < 0){
        currentPosition = 0;
    }
    return dispatch => {
        dispatch({
            type: POS_VALUE,
            currentPosition
        })
    }
}
//set facebook id and name
export function setFacebookDetails(name,facebookId){
    return dispatch => {
        dispatch({
            type: 'FACEBOOK_DETAILS',
            name,
            facebookId
        })
    }
}
//logout of facebook
export function onLogout(name,facebookId){
    return dispatch => {
        dispatch({
            type: 'FACEBOOK_DETAILS',
            name:'',
            facebookId:''
        })
    }
}
//insert user into db
export const insertUser=(name,facebookId)=> {

    return (dispatch) => {
        fetch("https://tv-guide-ws.herokuapp.com/insertUser", {
            method: "post",
            credentials: 'same-origin',
            mode: 'no-cors',
            redirect: 'follow',
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'text/plain',
            },
            body:JSON.stringify({
                facebookId: facebookId,
                name: name
            }),
        }).then((response) => {
            dispatch({
                type:'USER_INSERT_SUCCESS',
                user:true
            })
        }).catch((error)=>{
            dispatch({
                type:'USER_INSERT_SUCCESS',
                user:false
            })
        });
    }
}
//get fav from the db
export function getfavourites(facebookId,name) {
    return (dispatch) => {
        return axios.get(`https://tv-guide-ws.herokuapp.com/getUserFav/${facebookId}/${name}`)
            .then(favourites => {
                let ids = favourites.data.data.map((object)=>{
                    return object.channel_id
                })
                dispatch({
                    type:'FETCH_FAVOURITES',
                    favourites:ids
                })
            })
    };
}
// insert favourites into the db
export function insertFavourites(facebookId,name,channelId){
    return (dispatch) => {
        fetch("https://tv-guide-ws.herokuapp.com/insertUserFav", {
            method: "post",
            credentials: 'same-origin',
            mode: 'no-cors',
            redirect: 'follow',
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'text/plain',
            },
            body:JSON.stringify({
                facebookId: facebookId,
                name: name,
                channelId:channelId,
            }),
        }).then((response) => {
            dispatch({
                type:'USER_FAV_SUCCESS',
                favInserted:true
            })
        }).catch((error)=>{
            dispatch({
                type:'USER_FAV_SUCCESS',
                favInserted:false
            })
        });
    }
}
// remove fav from the db
export function updateFav(facebookId,name,channelId) {
    return (dispatch) => {
        return axios.get(`https://tv-guide-ws.herokuapp.com/updateUserFav/${facebookId}/${name}/${channelId}`)
            .then(favouritesUpdated => {
                console.log("were you updated",favouritesUpdated)
                dispatch({
                    type:'UPDATED_FAVOURITES',
                    favouritesUpdated:favouritesUpdated
                })
            })
    };
}
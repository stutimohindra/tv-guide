import {
    FETCH_CHANNELS_SUCCESS,
    FETCH_CHANNELS_EVENT_SUCCESS,
    GET_DATES,
    CHANNEL_ID,
    FETCH_SORT_ORDER_SUCCESS,
    FETCH_SET_SORT_ORDER_SUCCESS,
    SET_CHANNEL_LIST_SUCCESS,
    POS_VALUE,
    FACEBOOK_DETAILS,
    FETCH_FAVOURITES,
    USER_INSERT_SUCCESS,
    USER_FAV_SUCCESS,
    UPDATED_FAVOURITES
    } from '../actions/index';
import _ from 'lodash';
import moment from 'moment';


const INITIAL_STATE = {
    channels:[],
    channelId:'',
    startDate: moment(new Date()).format('YYYY-MM-DD hh:mm A'),
    endDate: '',
    sortOrder:1,
    channelEvent:[],
    sortKey:'channelStbNumber',
    currentPosition: 0,
    name: undefined,
    facebookId:undefined,
    favourites:[],
    user:false,
    favInserted:false,
    favouritesUpdated:false,
}

export function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_CHANNELS_SUCCESS:
            return {
                ...state,
                channels: action.channels
            }
        break;
        case FETCH_CHANNELS_EVENT_SUCCESS:
            return {
                ...state,
                channelEvent: _.extend({},state.channelEvent, action.channelEvent)
            }
        break;
        case CHANNEL_ID:
            return {
                ...state,
                channelId: action.channelId
            }
        break;
        case GET_DATES:
            return {
                ...state,
                startDate: action.startDate,
                endDate : action.endDate
            }
        break;
        case FETCH_SORT_ORDER_SUCCESS:
            return{
                ...state,
                channels: action.channels,
                sortOrder:action.sortOrder,
                sortKey: action.sortKey
            }
        break;
        case FETCH_SET_SORT_ORDER_SUCCESS:
            return{
                ...state,
                sortOrder:action.sortOrder,
                sortKey: action.sortKey
            }
         break;
        case SET_CHANNEL_LIST_SUCCESS:
            return{
                ...state,
                channelId: action.channelId
            }
        break;
        case POS_VALUE:
            return {
                ...state,
                currentPosition: action.currentPosition

            }
        break;
        case FACEBOOK_DETAILS:{
            return{
                ...state,
                name:action.name,
                facebookId:action.facebookId
            }
        }
        break;
        case FETCH_FAVOURITES:{
            return {
                ...state,
                favourites: action.favourites
            }
        }
        break;
        case USER_INSERT_SUCCESS:{
            return{
                ...state,
                user:action.user
            }
        }
        break;
        case USER_FAV_SUCCESS:{
            return{
                ...state,
                favInserted:action.favInserted
            }
        }
        break;
        case UPDATED_FAVOURITES:{
            return{
                ...state,
                favouritesUpdated:action.favouritesUpdated
            }
        }
        break;
        default:
            return state;
    }
}

module.exports = {
    reducer,
}

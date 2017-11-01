import {
    FETCH_CHANNELS_SUCCESS,
    FETCH_CHANNELS_EVENT_SUCCESS,
    GET_DATES,
    CHANNEL_ID,
    FETCH_SORT_ORDER_SUCCESS,
    FETCH_SET_SORT_ORDER_SUCCESS,
    SET_CHANNEL_LIST_SUCCESS,
    POS_VALUE
    } from '../actions/index'
import moment from 'moment';

const INITIAL_STATE = {
    channels:[],
    channelId:'',
    startDate: moment(new Date()).format('YYYY-MM-DD hh:mm A'),
    endDate: '',
    sortOrder:1,
    channelEvent:'',
    sortKey:'channelStbNumber',
    currentPosition: 0,
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
                channelEvent: action.channelEvent
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
        default:
            return state;
    }
}

module.exports = {
    reducer,
}
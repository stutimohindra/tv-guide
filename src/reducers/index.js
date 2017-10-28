import {
    FETCH_CHANNELS_SUCCESS,
    FETCH_CHANNELS_EVENT_SUCCESS,
    START_DATE,
    CHANNEL_ID,
    FETCH_SORT_ORDER_SUCCESS,
    FETCH_SET_SORT_ORDER_SUCCESS,
    SET_CHANNEL_LIST_SUCCESS
    } from '../actions/index'
import moment from 'moment';

const INITIAL_STATE = {
    channels:[],
    channelId:'',
    startDate: moment(new Date()).format('YYYY-MM-DD HH:MM'),
    sortOrder:1,
    sortKey:'channelStbNumber',
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
                channelEvent: action.channelEvent.data
            }
        break;
        case CHANNEL_ID:
            return {
                ...state,
                channelId: action.channelId
            }
        break;
        case START_DATE:
            return {
                ...state,
                startDate: action.startDate
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
        default:
            return state;
    }
}

module.exports = {
    reducer,
}
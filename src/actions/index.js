import axios from 'axios';

export const FETCH_CHANNELS_SUCCESS = 'FETCH_CHANNELS_SUCCESS';
export const SET_CHANNEL_LIST_SUCCESS = 'SET_CHANNEL_LIST_SUCCESS';
export const FETCH_CHANNELS_EVENT_SUCCESS = 'FETCH_CHANNELS_EVENT_SUCCESS';
export const FETCH_SET_SORT_ORDER_SUCCESS = 'FETCH_SET_SORT_ORDER_SUCCESS';
export const CHANNEL_ID = 'CHANNEL_ID';
export const START_DATE = 'START_DATE';
export const FETCH_CHANNELS_ONSORT_SUCCESS = 'FETCH_CHANNELS_ONSORT_SUCCESS';
export const FETCH_SORT_ORDER_SUCCESS = 'FETCH_SORT_ORDER_SUCCESS'

export const getChannelList = () => {
    return (dispatch) => {
        return axios.get(`http://ams-api.astro.com.my/ams/v3/getChannels`)
            .then(channels => {
              // TO DO: SORT THE CHANNELS HERE ITSELF BEFORE INITAL COMMIT
              //   sorting(channels,1,'sortKey')
                dispatch({
                    type: 'FETCH_CHANNELS_SUCCESS',
                    channels : channels.data.channel
                })
            })
            // .catch(error => {
            //     dispatch({ type: 'FETCH_CHANNELS_ERROR', error })
            // });
    };
};

export const getChannelEvent = (channelId,startDate,endDate) => {
    return (dispatch) => {
        return axios.get(`http://ams-api.astro.com.my/ams/v3/getEvents?channelId=${channelId}&periodStart=${startDate}&periodEnd=${endDate}`)
            .then( channelEvent => {
                dispatch({
                    type: 'FETCH_CHANNELS_EVENT_SUCCESS', channelEvent
                })
            })
            // .catch( error => {
            //     dispatch({ type: 'FETCH_CHANNELS_EVENT_ERROR', error })
            // })
    }
}

export function channelId(id) {
    return {
        type: CHANNEL_ID,
        channelId: channelId,
    }
}

export function startDate(startDate){
    return {
        type: START_DATE,
        startDate: startDate
    }
}

export function setChannelIdList(oldChannelIds,newChannelIds){

    let newList = oldChannelIds + newChannelIds;
    return dispatch => {
        dispatch ({
            type: 'SET_CHANNEL_LIST_SUCCESS',
            channelId: newList,
        })
    }
}

export function sorting(channels,sortKey,sortOrder){
    let newList = channels.sort( (a, b) => {

        let aVal = a[sortKey].toLowerCase()
        let bVal = b[sortKey].toLowerCase()

        return aVal > bVal ? sortOrder : bVal > aVal ? -sortOrder : 0

    });

    return dispatch => {
        dispatch ({
            type: 'FETCH_SORT_ORDER_SUCCESS',
            channels: newList,
            sortKey:sortKey,
            sortOrder:sortOrder
        })
    }
}

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
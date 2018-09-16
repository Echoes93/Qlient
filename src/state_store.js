import { lensProp, set } from 'ramda';
import { createStore, combineReducers } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import channel from './phoenix_channels'


// HERE WE DECLARE ACTION TYPES USED IN APPLICATION
const ACTION_TYPES = {
  GOT_RECORDS: 'GOT_RECORDS',
  NEW_VALUE: 'NEW_VALUE',
  SEARCH_QUERY_CHANGE: 'SEARCH_QUERY_CHANGE',
  EDIT_RECORD_KEY_CHANGE: 'EDIT_RECORD_KEY_CHANGE',
  EDIT_RECORD_VALUE_CHANGE: 'EDIT_RECORD_VALUE_CHANGE',
  EDIT_RECORD_SUBMIT: 'EDIT_RECORD_SUBMIT'
};

// ACTION CREATORS
const ACTION_CREATORS = {
  gotRecords: records => ({type: ACTION_TYPES.GOT_RECORDS, payload: records}),
  newValue: record => ({type: ACTION_TYPES.NEW_VALUE, payload: record}),
  searchQueryChange: query => ({type: ACTION_TYPES.SEARCH_QUERY_CHANGE, payload: query}),
  editRecordKeyChange: (key) => ({type: ACTION_TYPES.EDIT_RECORD_KEY_CHANGE, payload: key}),
  editRecordValueChange: (value) => ({type: ACTION_TYPES.EDIT_RECORD_VALUE_CHANGE, payload: value}),
  editRecordSubmit: (record) => ({type: ACTION_TYPES.EDIT_RECORD_SUBMIT, payload: record})
}

// PLAIN OLD REDUX-REDUCERS
const records = (state = {}, {type, payload}) => {
  switch (type) {
    case ACTION_TYPES.GOT_RECORDS:
      return payload;
    case ACTION_TYPES.NEW_VALUE:
      let new_state = set(lensProp(payload.key), payload.value, state);
      return new_state;
    default:
      return state;
  }
};


const searchQuery = (state = "", {type, payload}) => {
  switch (type) {
    case ACTION_TYPES.SEARCH_QUERY_CHANGE:
      return payload;
    default:
      return state;
  }
};

// 
const editRecord = (state = {key: "", value: ""}, {type, payload}) => {
  switch (type) {
    case ACTION_TYPES.EDIT_RECORD_KEY_CHANGE:
      return {...state, key: payload};
    case ACTION_TYPES.EDIT_RECORD_VALUE_CHANGE:
      return {...state, value: payload};
    case ACTION_TYPES.EDIT_RECORD_SUBMIT:
      channel.push("new_value", payload)
      return state
    default:
      return state;
  }
};

// FINALLY CREATE STATE STORE AND EXPORT IT
const store = createStore(
  combineReducers({records, searchQuery, editRecord}),
  devToolsEnhancer()
);

export { ACTION_TYPES, ACTION_CREATORS, store };
 
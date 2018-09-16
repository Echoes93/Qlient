import { createStore, combineReducers } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import channel from './phoenix_channels'


// HERE WE DECLARE ACTION TYPES USED IN APPLICATION
const ACTION_TYPES = {
  GOT_RECORDS: 'GOT_RECORDS',
  NEW_VALUE: 'NEW_VALUE',
  EDIT_RECORD: 'EDIT_RECORD',
  DELETE_RECORD: 'DELETE_RECORD',
  RECORD_DELETED: 'RECORD_DELETED',
  SEARCH_QUERY_CHANGE: 'SEARCH_QUERY_CHANGE',
  EDIT_RECORD_KEY_CHANGE: 'EDIT_RECORD_KEY_CHANGE',
  EDIT_RECORD_VALUE_CHANGE: 'EDIT_RECORD_VALUE_CHANGE',
  EDIT_RECORD_SUBMIT: 'EDIT_RECORD_SUBMIT'
};

// ACTION CREATORS
const ACTION_CREATORS = {
  gotRecords: records => ({type: ACTION_TYPES.GOT_RECORDS, payload: records}),
  newValue: record => ({type: ACTION_TYPES.NEW_VALUE, payload: record}),
  editRecord: record => ({type: ACTION_TYPES.EDIT_RECORD, payload: record}),
  deleteRecord: key => ({type: ACTION_TYPES.DELETE_RECORD, payload: key}),
  recordDeleted: key => ({type: ACTION_TYPES.RECORD_DELETED, payload: key}),
  searchQueryChange: query => ({type: ACTION_TYPES.SEARCH_QUERY_CHANGE, payload: query}),
  editRecordKeyChange: (key) => ({type: ACTION_TYPES.EDIT_RECORD_KEY_CHANGE, payload: key}),
  editRecordValueChange: (value) => ({type: ACTION_TYPES.EDIT_RECORD_VALUE_CHANGE, payload: value}),
  editRecordSubmit: (record) => ({type: ACTION_TYPES.EDIT_RECORD_SUBMIT, payload: record})
}

// PLAIN OLD REDUX-REDUCERS
const records = (state = [], {type, payload}) => {
  switch (type) {
    case ACTION_TYPES.GOT_RECORDS:
      return payload;
    case ACTION_TYPES.NEW_VALUE:
      const new_state = state
        .filter(record => record.key !== payload.key)
        .concat({key: payload.key, value: payload.value})
      return new_state;
    case ACTION_TYPES.RECORD_DELETED:
      return state.filter(record => record.key !== payload)
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
    case ACTION_TYPES.EDIT_RECORD:
      return {key: payload.key, value: payload.value}
    case ACTION_TYPES.EDIT_RECORD_KEY_CHANGE:
      return {...state, key: payload};
    case ACTION_TYPES.EDIT_RECORD_VALUE_CHANGE:
      return {...state, value: payload};
    case ACTION_TYPES.EDIT_RECORD_SUBMIT:
      channel.push("new_value", payload)
      return state
    case ACTION_TYPES.DELETE_RECORD:
      channel.push("delete_record", {key: payload})
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
 
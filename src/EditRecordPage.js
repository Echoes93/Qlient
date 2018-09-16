import { connect } from 'inferno-redux';
import { ACTION_CREATORS } from './state_store';


const EditRecord = ({ editRecordKey, editRecordValue, onKeyChange, onValueChange, onEditRecordSubmit }) => (
  <div className={"App"}>
    <input placeholder="key" value={editRecordKey} onInput={e => onKeyChange(e.target.value)} />
    <input placeholder="value" value={editRecordValue} onInput={e => onValueChange(e.target.value)} />
    <button onClick={() => onEditRecordSubmit({key: editRecordKey, value: editRecordValue})}>Edit Record</button>
  </div>
);

export default connect(
  state => ({
    editRecordKey: state.editRecord.key,
    editRecordValue: state.editRecord.value
  }),
  dispatch => ({
    onKeyChange: key => dispatch(ACTION_CREATORS.editRecordKeyChange(key)),
    onValueChange: value => dispatch(ACTION_CREATORS.editRecordValueChange(value)),
    onEditRecordSubmit: record => dispatch(ACTION_CREATORS.editRecordSubmit(record))
  })
)(EditRecord);

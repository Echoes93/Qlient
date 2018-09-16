import { Socket } from 'phoenix';
import { store, ACTION_CREATORS } from './state_store';

const socket = new Socket('ws://localhost:4000/socket', {})
socket.connect()
socket.onError( () => console.log("there was an error with the connection!") )
socket.onClose( () => console.log("the connection dropped") )

const channel = socket.channel('records');
channel.on("new_value", response => store.dispatch(ACTION_CREATORS.newValue(response.data)));
channel.on("record_deleted", response => store.dispatch(ACTION_CREATORS.recordDeleted(response.key)));
channel.join().receive("ok", response => store.dispatch(ACTION_CREATORS.gotRecords(response.data)));

export default channel;

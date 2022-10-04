import configureStore from './configureStore';

// ==============================|| REDUX - MAIN STORE ||============================== //

const store = configureStore();
const persister = 'Free';

export { store, persister };

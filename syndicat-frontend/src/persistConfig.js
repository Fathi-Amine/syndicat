
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['apartmentDetails'],
    blacklist: [],
};

export default persistConfig;

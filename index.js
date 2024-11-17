import debug from 'debug';
import axios from 'axios';
import axiosDebugLog from 'axios-debug-log';
import pageLoader from './bin/page-loader.js';

const logPageLoader = debug('page-loader');
axiosDebugLog(axios);

export { logPageLoader };
export default pageLoader;

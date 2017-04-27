import 'babel-polyfill';
import ReactDOM from 'react-dom';
import routes from './routes';
import css from '../assets/scss/styles.scss';

const app = document.getElementById('app');

ReactDOM.render(routes, app);

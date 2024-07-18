import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { store } from './state/store';
import { Provider } from 'react-redux';
import { App } from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<Provider store={store}>
		<App />
	</Provider>
);

reportWebVitals();

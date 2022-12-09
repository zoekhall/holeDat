import React from 'react';
import ReactDOM from 'react-dom/client';
import '../client/index.scss';
import 'swiper/css/bundle';

// components import
import App from './components/App';

const rootElement = document.getElementById('app');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);

root.render(<App />);

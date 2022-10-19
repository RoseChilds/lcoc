import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css';
import App from './components/App';
import {initializeApp} from "firebase/app";
import {getAnalytics, logEvent} from "firebase/analytics";
import firebaseConfig from './ext/firebase.json';
import events from './ext/events';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import {ChakraProvider, extendTheme} from '@chakra-ui/react'
import {ParallaxProvider} from "react-scroll-parallax";

// eslint-disable-next-line
Array.prototype.shuffle = function () {
  let i = this.length, j, temp;
  if (i === 0) return this;
  while (--i) {
    j = Math.floor(Math.random() * (i + 1));
    temp = this[i];
    this[i] = this[j];
    this[j] = temp;
  }
  return this;
}

let analyticsActive = false;
let analytics;

const handleAnalytics = async (doAnalytics = true) => {
  if (!doAnalytics) return;
  analyticsActive = true;
  const app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);
}

let currentPath = null;

const handlePathChange = (e) => {
  window.scrollTo(0, 0);
  if (!analyticsActive) return;
  const path = e.pathname;
  if (path === currentPath) return;
  currentPath = path;
  setTimeout(() => {
    logEvent(analytics, 'page_view', {
      page_path: path,
      page_title: document.title,
      page_location: window.location.href
    });
  }, 500);
}

events.once("cookieChange", handleAnalytics);
events.on("pathChange", handlePathChange);
events.on("logEvent", (name, info) => {
  if (!analyticsActive) return;
  logEvent(analytics, name, info);
});

window.developmentMode = process.env.NODE_ENV === "development";

const theme = extendTheme({
  fonts: {
    heading: `Gotham, sans-serif`,
    body: `Gotham, sans-serif`,
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ParallaxProvider>
        <Router>
          <App/>
        </Router>
      </ParallaxProvider>
    </ChakraProvider>
  </React.StrictMode>
);

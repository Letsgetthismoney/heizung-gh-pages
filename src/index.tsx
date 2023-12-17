import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import store from "./Store";
import {createTheme, MantineProvider} from "@mantine/core";
// core styles are required for all packages
import '@mantine/core/styles.css';
import {notifications, Notifications} from "@mantine/notifications";
import '@mantine/notifications/styles.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const theme = createTheme({
    /** Put your mantine theme override here */
});
notifications.show({
    title: 'ui optimzed for Desktop use',
    message: 'This is a prototype',
})
root.render(
  <React.StrictMode>
      <Provider store={store}>
          <MantineProvider theme={theme}>
              <Notifications position="top-right"/>
              <App />
          </MantineProvider>
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

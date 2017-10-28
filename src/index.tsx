import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import 'font-awesome/css/font-awesome.css'
// import registerServiceWorker from './registerServiceWorker';
import './index.css'

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root') as HTMLElement
)
// Needs work to be useful
// registerServiceWorker();

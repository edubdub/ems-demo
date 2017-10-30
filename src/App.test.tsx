import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { getStore } from './redux/store'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
const store = getStore()
it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <MuiThemeProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </MuiThemeProvider>,
    div
  )
})

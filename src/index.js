// polyfills
import 'babel-polyfill'
import 'whatwg-fetch'
import Promise from 'bluebird'

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import configureStore from './configureStore'
import './index.css'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import 'react-datasheet/lib/react-datasheet.css'

window.Promise = Promise
const store = configureStore()

// a short-term fix for data-provider, should get fixed in next release
class DispatchProvider extends React.Component {
  static childContextTypes = {
    dispatch: PropTypes.func,
  }

  getChildContext() {
    return {dispatch: this.props.dispatch}
  }

  render() {
    return <div> {this.props.children} </div>
  }
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
      <DispatchProvider dispatch={store.dispatch}>
        <App />
      </DispatchProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()

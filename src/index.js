import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import { Provider } from 'mobx-react'
import { configure } from 'mobx'
import bookStore from './stores/bookStore'
import registerServiceWorker from './registerServiceWorker'

configure({ enforceActions: 'strict' })

const stores = {
  bookStore,
}

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()

import React from 'react'
import ReactDOM from 'react-dom'
import './scss/main.css'
import './setup/extensions'
import App from './App'
import registerInterceptors from './setup/interceptors'

registerInterceptors()
ReactDOM.render(<App />, document.getElementById('root'))

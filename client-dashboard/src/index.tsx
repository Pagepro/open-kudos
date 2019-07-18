import './scss/main.css'
import 'antd/dist/antd.css'
import './setup/extensions'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerInterceptors from './setup/interceptors'

registerInterceptors()
ReactDOM.render(<App />, document.getElementById('root'))

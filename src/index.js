import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import ReactGA from 'react-ga4'

ReactGA.initialize('G-1Q2G26WWE7')

const el = document.getElementById('root')

const root = ReactDOM.createRoot(el)

root.render(
  <DndProvider backend={HTML5Backend}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </DndProvider>
)

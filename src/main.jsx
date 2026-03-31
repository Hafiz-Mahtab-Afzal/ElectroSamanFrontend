import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './redux/store'
import Elecrto from './Elecrto'
import Authprovider from './context/auth'


createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <Authprovider>
    <Elecrto />
    </Authprovider>
  </Provider>,
)

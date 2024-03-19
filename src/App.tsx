import './App.css'
import Footer from './layouts/footer/Footer'
import Header from './layouts/header/Header'
import store from './redux/store'
import MainRoutes from './routes/MainRoutes'
import { Provider } from 'react-redux'



function App() {

  return (
    <>
      <Provider store={store}>
        <Header/>
        <MainRoutes />
        <Footer/>
      </Provider>
    </>
  )
}

export default App

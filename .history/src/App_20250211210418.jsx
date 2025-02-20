import MainShop from './views/shop-order/MainShop'
import Loading from './views/Loading';
import { ToastContainer, toast } from 'react-toastify';

function App() {

  return (
    <>
      <MainShop />
      <Loading />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App

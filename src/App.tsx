
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./App.css";
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import { createGlobalStyle } from 'styled-components';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import Register from './components/Register/Register';
import SingleCoupon from './components/Single-Coupon-Page/SingleCoupon';
import { useSelector } from 'react-redux';
import { AppState } from './Redux/app-state';
import { CartProvider } from './components/Context/Cart-Context';
import CreateCouponModal from './components/Modals/CreateCouponModal';
import MyInfoPage from './components/My-Info-Page/MyInfoPage';
import Checkout from './components/Checkout/Checkout';
import Receipt from './components/Receipt/Receipt';
import Coupons from './components/Coupons/Coupons';
import SingleCompanyPage from './components/AdminMGMT/SingleCompanyPage/SingleCompanyPage';
import Statistics from './components/AdminMGMT/Statistics/Statistics';
import CompanyStats from './components/CompanyStats/CompanyStats';
import PurchasesHistory from './components/PurchasesHistory/PurchasesHistory';
import CreateCompanyModal from './components/Modals/CreateCompanyModal';
import AdminPage from './components/AdminMGMT/AdminPage/AdminPage';
import SingleUserPage from './components/AdminMGMT/SingleUserPage/SingleUserPage';
import Guide from './components/AdminMGMT/Guide/Guide';
import { AuthProvider, useAuth } from './components/Context/AuthProvider';
import Unautorized from './components/Unauthorized/Unautorized';
import RequireAuth from './components/RequireAuth/RequireAuth';


function App() {

  let openModal = useSelector((state: AppState) => state.openModal)
  let openCompanyModal = useSelector((state: AppState) => state.openCompanyModal)


  const { tokenDecoded } = useAuth()


  const GlobalStyle = createGlobalStyle`
  body {
   font-family: 'Changa', sans-serif;

  }
  `


  return (
    <div className='app'>
      <GlobalStyle />
      {/* <SocketContainer> */}
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <Header />
            {openModal && <CreateCouponModal />}
            {openCompanyModal && <CreateCompanyModal />}

            <Routes>

              <Route path='/' element={<Coupons />} />
              <Route path="/signup" element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/unauthorized' element={<Unautorized />} />


              <Route element={<RequireAuth allowdRoles={'ROLE_Admin'} />}>
                <Route path='/coupon/:id' element={<SingleCoupon />} />
                <Route path='/myinfo' element={<MyInfoPage />} />
                <Route path='/checkout' element={<Checkout />} />
                <Route path='/purchaseshistory' element={<PurchasesHistory />} />
                <Route path='/receipt' element={<Receipt />} />
                <Route path='/user/:id' element={<SingleUserPage />} />
              </Route>

              <Route element={<RequireAuth allowdRoles={'ROLE_Company'} />}>
                <Route path='/companystatistics' element={<CompanyStats />} />
              </Route>

              <Route element={<RequireAuth allowdRoles={'ROLE_Admin'} />}>
                <Route path='/mgmt' element={<AdminPage />} />
                <Route path='/company/:id' element={<SingleCompanyPage />} />
                <Route path='/statistics' element={<Statistics />} />
                <Route path='/guide' element={<Guide />} />
              </Route>


            </Routes>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
      {/* </SocketContainer> */}
    </div>
  );
}

export default App;

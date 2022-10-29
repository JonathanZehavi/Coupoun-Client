import Coupons from '../Coupons/Coupons';
import Menu from '../Menu/Menu';
import './Layout.css';

function Layout() {


  return (

    <section className="layout">
      <header>
        {/* <Header/> */}
      </header>
      <aside>
       <Menu />
      </aside>
      <main>
        <Coupons />
      </main>
      <footer>
        {/* <Footer/> */}
      </footer>
    </section>
  );
}

export default Layout;

import Coupons from '../Coupons/Coupons';
import Menu from '../Menu/Menu';
import './Layout.css';

function Layout() {


  return (
    // <>
    // <div>
    // <section className="layout">
    //     <Menu />
    //   <main className='main'>
    //     <Coupons />
    //   </main>
    // </section>
    // </div>
    // </>

    <section className="layout">
      {/* <header>

      </header> */}

      <aside>
       <Menu />
      </aside>

      <main>
        <Coupons />
      </main>

      {/* <footer>

      </footer> */}
    </section>
  );
}

export default Layout;

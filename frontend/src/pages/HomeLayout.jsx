import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import HeaderIn from '../components/common/header/header'
import { Outlet } from "react-router";

export default function HomeLayout() {
  
  return (
    <>
    <div className="flex flex-col min-h-screen">
        <HeaderIn />
        <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
                <Outlet />
          </main>
        <Footer />
    </div>
    </>
  );

};

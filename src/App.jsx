import "./App.css";
import Body from "./components/Body";
import Footer from "./layout/Footer";
import Header from "./layout/Header";

function App() {
  return (
    <>
      <div className="w-auto h-screen">
        <Header />
        <Body />
        <Footer />
      </div>
    </>
  );
}

export default App;

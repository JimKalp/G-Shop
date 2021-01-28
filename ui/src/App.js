import './App.css';
import ProductList from './components/ProductList';
import Footer from "./components/Footer";
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const products = [
  {
    id: 1,
    description: "Gadget",
    price: "12.99$",
    category: "tech",
    image: <img src="https://image.made-in-china.com/43f34j00deQTRmpwlCqK/10-2-Inch-Mini-Laptop-with-High-Configuration.jpg" 
      alt="laptop"/>
  },
  {
    id: 2,
    description: "Gadget",
    price: "19.99$",
    category: "tech",
    image: <img src="https://image.made-in-china.com/43f34j00deQTRmpwlCqK/10-2-Inch-Mini-Laptop-with-High-Configuration.jpg" 
      alt="laptop"/>
  },
  {
    id: 3,
    description: "Laptop",
    price: "192.99$",
    category: "tech",
    image: <img src="https://image.made-in-china.com/43f34j00deQTRmpwlCqK/10-2-Inch-Mini-Laptop-with-High-Configuration.jpg" 
      alt="laptop"/>
  },
  {
    id: 4,
    description: "Laptop",
    price: "192.99$",
    category: "tech",
    image: <img src="https://image.made-in-china.com/43f34j00deQTRmpwlCqK/10-2-Inch-Mini-Laptop-with-High-Configuration.jpg" 
      alt="laptop"/>
  },
  {
    id: 5,
    description: "Laptop",
    price: "192.99$",
    category: "tech",
    image: <img src="https://image.made-in-china.com/43f34j00deQTRmpwlCqK/10-2-Inch-Mini-Laptop-with-High-Configuration.jpg" 
      alt="laptop"/>
  },
]

function App() {
  return (
    <div>
      <div>
          <ProductList products={products} />
      </div>
      <Footer />
    </div>
  );
}

export default App;

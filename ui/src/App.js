import './App.css';
import ProductList from './components/ProductList';

const products = [
  {
    id: 1,
    description: "Gadget",
    price: 12.99,
    category: "tech",
  },
  {
    id: 2,
    description: "Gadget",
    price: 19.99,
    category: "tech",
  },
  {
    id: 3,
    description: "Laptop",
    price: 192.99,
    category: "tech",
  },
]

function App() {
  return (
    <div>
      <ProductList products={products} />
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import ProductList from './components/ProductList';

const products = [
  {
    id: 1,
    price: 12.99,
    category: "tech",
  },
  {
    id: 2,
    price: 19.99,
    category: "tech",
  },
  {
    id: 3,
    price: 192.99,
    category: "garden",
  },
]

function App() {
  return (
    <div className="App">
      <ProductList products={products} />
    </div>
  );
}

export default App;

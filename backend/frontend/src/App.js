import './styles.css';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import ProductTable from './components/ProductTable';

export default function App() {
  return (
    <>
      <Sidebar />
      <Topbar />
      <ProductTable />
    </>
  );
}

import DashboardLayout from '../../../components/layout/DashboardLayout';

import ProductTable from '../../../components/ProductTable';
import ProductModal from '../../../components/ProductModal';

export default function Products() {
  return (
    <DashboardLayout>
      <div className="container">
        <h1 className="text-2xl font-bold mb-4">Quản lý sản phẩm</h1>
        <ProductTable />
        <ProductModal />
      </div>
    </DashboardLayout>
  );
}

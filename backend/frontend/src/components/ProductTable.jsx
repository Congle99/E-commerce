export default function ProductTable() {
    return (
      <div className="main-content">
        <h2>Danh sách sản phẩm</h2>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên sản phẩm</th>
              <th>Danh mục</th>
              <th>Giá</th>
              <th>Tồn kho</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>F001</td>
              <td>Áo thun cổ tròn</td>
              <td>Áo thun</td>
              <td>250.000đ</td>
              <td>45</td>
              <td><span className="status in-stock">Còn hàng</span></td>
              <td className="actions">
                <button>✏️</button>
                <button>🗑️</button>
              </td>
            </tr>
            <tr>
              <td>F002</td>
              <td>Quần jeans</td>
              <td>Quần</td>
              <td>450.000đ</td>
              <td>5</td>
              <td><span className="status low-stock">Sắp hết</span></td>
              <td className="actions">
                <button>✏️</button>
                <button>🗑️</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  
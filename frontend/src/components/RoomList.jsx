import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RoomList.css';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [roomsToDelete, setRoomsToDelete] = useState([]);
  // Hardcode danh sách hình thức thanh toán
  const paymentMethods = [
    { id: 1, method_name: 'Theo tháng' },
    { id: 2, method_name: 'Theo quý' },
    { id: 3, method_name: 'Theo năm' }
  ];
  const [formData, setFormData] = useState({
    tenant_name: '',
    phone_number: '',
    start_date: '',
    payment_method_id: '1', // Mặc định là "Theo tháng" (id: 1)
    note: ''
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async (query = '') => {
    const url = query ? `http://localhost:3001/rooms/search?query=${encodeURIComponent(query)}` : 'http://localhost:3001/rooms';
    try {
      const response = await axios.get(url);
      console.log('Fetched rooms:', response.data); // Log để debug
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
  };

  const validateForm = () => {
    const errors = {};
    // Validate tenant_name
    if (!formData.tenant_name) {
      errors.tenant_name = 'Tên người thuê là bắt buộc';
    } else if (formData.tenant_name.length < 5 || formData.tenant_name.length > 50) {
      errors.tenant_name = 'Tên phải từ 5 đến 50 ký tự';
    } else if (/[0-9!@#$%^&*]/.test(formData.tenant_name)) {
      errors.tenant_name = 'Tên không được chứa số hoặc ký tự đặc biệt';
    }

    // Validate phone_number
    if (!formData.phone_number) {
      errors.phone_number = 'Số điện thoại là bắt buộc';
    } else if (!/^\d{10}$/.test(formData.phone_number)) {
      errors.phone_number = 'Số điện thoại phải là 10 chữ số';
    }

    // Validate start_date
    if (!formData.start_date) {
      errors.start_date = 'Ngày bắt đầu là bắt buộc';
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDate = new Date(formData.start_date);
      if (selectedDate < today) {
        errors.start_date = 'Ngày bắt đầu không được là quá khứ';
      }
    }

    // Validate payment_method_id
    if (!formData.payment_method_id) {
      errors.payment_method_id = 'Hình thức thanh toán là bắt buộc';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreate = async () => {
    if (validateForm()) {
      try {
        await axios.post('http://localhost:3001/rooms', {
          ...formData,
          payment_method_id: parseInt(formData.payment_method_id) // Chuyển thành số
        });
        setFormData({
          tenant_name: '',
          phone_number: '',
          start_date: '',
          payment_method_id: '1', // Reset về giá trị mặc định
          note: ''
        });
        setShowCreateForm(false);
        setFormErrors({});
        fetchRooms();
      } catch (error) {
        console.error('Error creating room:', error);
      }
    }
  };

  const handleCancelCreate = () => {
    setShowCreateForm(false);
    setFormData({
      tenant_name: '',
      phone_number: '',
      start_date: '',
      payment_method_id: '1', // Reset về giá trị mặc định
      note: ''
    });
    setFormErrors({});
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchRooms(query);
  };

  const handleCheckboxChange = (roomId) => {
    setRoomsToDelete((prev) =>
      prev.includes(roomId) ? prev.filter((id) => id !== roomId) : [...prev, roomId]
    );
  };

  const handleDeleteMulti = () => {
    if (roomsToDelete.length > 0) {
      setShowDeletePopup(true);
    }
  };

  const confirmDelete = async () => {
    if (roomsToDelete.length > 0) {
      try {
        await axios.post('http://localhost:3001/rooms/delete-multi', { ids: roomsToDelete });
        setRooms(rooms.filter((room) => !roomsToDelete.includes(room.id)));
        setRoomsToDelete([]);
        setShowDeletePopup(false);
      } catch (error) {
        console.error('Error deleting rooms:', error);
      }
    }
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
    setRoomsToDelete([]);
  };

  return (
    <div className="container">
      <h2>Danh sách phòng trọ</h2>
      <div className="search-create">
        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Tìm kiếm theo mã phòng, tên, hoặc số điện thoại"
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
        <button className="create-btn" onClick={() => setShowCreateForm(true)}>
          Tạo mới
        </button>
      </div>
      <table className="room-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    setRoomsToDelete(rooms.map((room) => room.id));
                  } else {
                    setRoomsToDelete([]);
                  }
                }}
                checked={roomsToDelete.length === rooms.length && rooms.length > 0}
              />
            </th>
            <th>Mã phòng</th>
            <th>Tên người thuê</th>
            <th>Số điện thoại</th>
            <th>Ngày bắt đầu thuê</th>
            <th>Hình thức thanh toán</th>
            <th>Ghi chú</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id}>
              <td>
                <input
                  type="checkbox"
                  checked={roomsToDelete.includes(room.id)}
                  onChange={() => handleCheckboxChange(room.id)}
                />
              </td>
              <td>PT-{String(room.id).padStart(3, '0')}</td>
              <td>{room.tenant_name}</td>
              <td>{room.phone_number}</td>
              <td>{formatDate(room.start_date)}</td>
              <td>{room.method_name || 'Phương thức 1'}</td>
              <td>{room.note || '-'}</td>
              <td>
                <button className="edit-btn">Sửa</button>
                <button
                  className="delete-btn"
                  onClick={() => {
                    setRoomsToDelete([room.id]);
                    setShowDeletePopup(true);
                  }}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {roomsToDelete.length > 0 && (
        <button className="delete-multi-btn" onClick={handleDeleteMulti}>
          Xóa các phòng đã chọn
        </button>
      )}

      {showCreateForm && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Tạo mới thông tin thuê trọ</h3>
            <div className="form-group">
              <label>Tên người thuê:</label>
              <input
                type="text"
                value={formData.tenant_name}
                onChange={(e) => setFormData({ ...formData, tenant_name: e.target.value })}
              />
              {formErrors.tenant_name && <span className="error">{formErrors.tenant_name}</span>}
            </div>
            <div className="form-group">
              <label>Số điện thoại:</label>
              <input
                type="text"
                value={formData.phone_number}
                onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
              />
              {formErrors.phone_number && <span className="error">{formErrors.phone_number}</span>}
            </div>
            <div className="form-group">
              <label>Ngày bắt đầu thuê:</label>
              <input
                type="date"
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
              />
              {formErrors.start_date && <span className="error">{formErrors.start_date}</span>}
            </div>
            <div className="form-group">
              <label>Hình thức thanh toán:</label>
              <select
                value={formData.payment_method_id}
                onChange={(e) => setFormData({ ...formData, payment_method_id: e.target.value })}
              >
                {paymentMethods.map((method) => (
                  <option key={method.id} value={method.id}>
                    {method.method_name}
                  </option>
                ))}
              </select>
              {formErrors.payment_method_id && (
                <span className="error">{formErrors.payment_method_id}</span>
              )}
            </div>
            <div className="form-group">
              <label>Ghi chú:</label>
              <textarea
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              />
            </div>
            <div className="popup-actions">
              <button className="confirm-btn" onClick={handleCreate}>
                Tạo mới
              </button>
              <button className="cancel-btn" onClick={handleCancelCreate}>
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeletePopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Xác nhận xóa</h3>
            <p>
              Bạn có chắc muốn xóa thông tin thuê trọ{' '}
              <strong>
                {roomsToDelete
                  .map((id) => `PT-${String(id).padStart(3, '0')}`)
                  .join(', ')}
              </strong>{' '}
              hay không?
            </p>
            <div className="popup-actions">
              <button className="confirm-btn" onClick={confirmDelete}>
                Có
              </button>
              <button className="cancel-btn" onClick={cancelDelete}>
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomList;
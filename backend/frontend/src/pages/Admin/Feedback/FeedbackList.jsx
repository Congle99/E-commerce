import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FeedbackList.scss";

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [replyText, setReplyText] = useState({});

  const loadFeedbacks = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8000/api/feedbacks");
      setFeedbacks(res.data.data || []);
    } catch (err) {
      setError("Không tải được đánh giá");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeedbacks();
  }, []);

  const handleReply = async (id) => {
    try {
      await axios.put(`http://localhost:8000/api/feedbacks/${id}`, {
        reply: replyText[id] || "",
      });
      setReplyText({ ...replyText, [id]: "" });
      loadFeedbacks();
    } catch (err) {
      alert("Gửi phản hồi thất bại!");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xoá đánh giá này không?")) return;
  
    try {
      await axios.delete(`http://localhost:8000/api/feedbacks/${id}`);
      alert("Xoá thành công!");
      loadFeedbacks();
    } catch (error) {
      console.error("Xoá thất bại:", error);
      alert("Xoá thất bại! Kiểm tra feedback có tồn tại không! Vui lòng load lại trang!");
    }
  };
  

  return (
    <div className="feedback-container">
      <h3>Danh sách đánh giá</h3>
      {loading ? (
        <p>Đang tải đánh giá...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : feedbacks.length === 0 ? (
        <p>Chưa có đánh giá nào.</p>
      ) : (
        <ul className="feedback-list">
          {feedbacks.map((item) => (
            <li key={item.id} className="feedback-item">
              <p><strong>{item.name}</strong> ({item.rating} sao)</p>
              <p>{item.content}</p>
              {item.reply && <p className="reply">Phản hồi: {item.reply}</p>}
              <div className="actions">
                <input
                  type="text"
                  placeholder="Nhập phản hồi..."
                  value={replyText[item.id] || ""}
                  onChange={(e) =>
                    setReplyText({ ...replyText, [item.id]: e.target.value })
                  }
                />
                <button onClick={() => handleReply(item.id)}>Trả lời</button>
                <button onClick={() => handleDelete(item.id)} className="delete-btn">
                  Xoá
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FeedbackList;

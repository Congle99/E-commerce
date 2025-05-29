<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Yêu cầu hỗ trợ</title>
</head>
<body>
    <h2 style="color: #2c3e50;">Yêu cầu hỗ trợ từ khách hàng</h2>

    <p><strong>Email khách hàng:</strong> {{ $email }}</p>

    <p><strong>Nội dung yêu cầu:</strong></p>
    <div style="padding: 10px; background: #f4f4f4; border-radius: 5px;">
        {{ $messageContent }}
    </div>
</body>
</html>

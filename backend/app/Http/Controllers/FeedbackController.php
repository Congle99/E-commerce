<?php

// namespace App\Http\Controllers;

// use Illuminate\Http\Request;
// use App\Models\Feedback;

// class FeedbackController extends Controller
// {
//     // Lấy danh sách tất cả feedback
//     public function index()
//     {
//         $feedbacks = Feedback::all();
//         return response()->json($feedbacks);
//     }

//     // Tạo feedback mới
//     public function store(Request $request)
//     {
//         $request->validate([
//             'user_id' => 'required|integer',
//             'content' => 'required|string|max:2000',
//         ]);

//         $feedback = Feedback::create([
//             'user_id' => $request->user_id,
//             'content' => $request->content,
//         ]);

//         return response()->json([
//             'message' => 'Feedback đã được tạo thành công!',
//             'data' => $feedback,
//         ], 201);
//     }

//     // Cập nhật reply cho feedback
//     public function updateReply(Request $request, $id)
//     {
//         $request->validate([
//             'reply' => 'required|string|max:1000',
//         ]);

//         $feedback = Feedback::findOrFail($id);
//         $feedback->reply = $request->reply;
//         $feedback->save();

//         return response()->json([
//             'message' => 'Phản hồi đã được lưu!',
//             'data' => $feedback,
//         ]);
//     }

//     // Xóa feedback (nếu cần)
//     public function destroy($id)
//     {
//         $feedback = Feedback::findOrFail($id);
//         $feedback->delete();

//         return response()->json([
//             'message' => 'Feedback đã được xóa!',
//         ]);
//     }
// } 


namespace App\Http\Controllers;

use App\Models\Feedback;
use Illuminate\Http\Request;

class FeedbackController extends Controller
{
    public function index()
    {
        $feedbacks = Feedback::all(); // hoặc paginate()

        return response()->json([
            'data' => $feedbacks
        ]);
    }

    public function updateReply(Request $request, $id)
    {
        $feedback = Feedback::findOrFail($id);
        $feedback->reply = $request->reply;
        $feedback->save();

        return response()->json(['message' => 'Phản hồi đã được lưu!']);
    }
    public function destroy($id)
{
    $feedback = Feedback::find($id);

    if (!$feedback) {
        return response()->json(['message' => 'Không tìm thấy đánh giá!'], 404);
    }

    try {
        $feedback->delete();
        return response()->json(['message' => 'Xoá đánh giá thành công!']);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Xoá thất bại!'], 500);
    }
}
}

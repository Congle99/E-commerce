<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class InvoiceController extends Controller
{
    /**
     * Lấy danh sách hóa đơn kèm order và user,
     * chỉ lấy những order có status completed
     */
    public function index()
    {
        $invoices = Invoice::with('order.user')->paginate(10);
        return response()->json([
            'data' => $invoices->items(),
            'current_page' => $invoices->currentPage(),
            'last_page' => $invoices->lastPage(),
            'total' => $invoices->total(),
        ]);
    }
    

    /**
     * Lấy chi tiết hóa đơn theo id
     */
    public function show($id)
    {
        $invoice = Invoice::with(['order.user'])->find($id);
        if (!$invoice) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invoice not found'
            ], 404);
        }
        return response()->json([
            'status' => 'success',
            'data' => $invoice
        ], 200);
    }

public function store(Request $req) {
    $data = $req->validate([
      'order_id'       => 'required|exists:orders,id',
      'invoice_number' => 'required|string',
      'total_amount'   => 'required|numeric',
      'invoice_date'   => 'required|date',
      'status'         => 'required|in:unpaid,paid',
    ]);
    $inv = Invoice::create($data);
    return response()->json(['data'=>$inv],201);
  }
  
  public function update(Request $request, $id)
  {
      $invoice = Invoice::find($id);
      if (!$invoice) {
          return response()->json(['status' => 'error', 'message' => 'Invoice not found'], 404);
      }
  
      $validator = Validator::make($request->all(), [
          'status' => 'required|string|in:unpaid,paid,cash_on_delivery,cancelled',
      ]);
  
      if ($validator->fails()) {
          return response()->json(['status' => 'error', 'errors' => $validator->errors()], 422);
      }
  
      $invoice->status = $request->status;
      $invoice->save();
  
      return response()->json([
          'status' => 'success',
          'message' => 'Invoice updated successfully',
          'data' => $invoice
      ], 200);
  }
  
  

  
}

<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Order;
use App\Models\Invoice;

class GenerateInvoices extends Command
{
    protected $signature = 'invoices:generate';

    protected $description = 'Generate invoices for completed orders without invoices';

    public function handle()
    {
        $orders = Order::where('status', 'completed')->doesntHave('invoice')->get();

        foreach ($orders as $order) {
            Invoice::create([
                'order_id' => $order->id,
                'invoice_number' => 'INV-' . now()->format('YmdHis') . '-' . $order->id,
                'total_amount' => $order->total_price,
                'invoice_date' => now(),
                'status' => 'unpaid',
            ]);

            $this->info("Created invoice for Order ID {$order->id}");
        }

        $this->info('All invoices generated successfully.');

        return 0;
    }
}

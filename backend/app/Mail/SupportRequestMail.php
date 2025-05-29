<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SupportRequestMail extends Mailable
{
    use Queueable, SerializesModels;

    public $email;
    public $messageContent;

    public function __construct($email, $messageContent)
    {
        $this->email = $email;
        $this->messageContent = $messageContent;
    }

    public function build()
    {
        return $this->subject('Yêu cầu hỗ trợ từ khách hàng')
                    ->view('emails.support')
                    ->with([
                        'email' => $this->email,
                        'messageContent' => $this->messageContent,
                    ]);
    }
}


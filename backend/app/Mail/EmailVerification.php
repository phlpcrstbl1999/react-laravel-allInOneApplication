<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class EmailVerification extends Mailable
{
    use Queueable, SerializesModels;

    public $verificationToken;
    /**
     * Create a new message instance.
     */
    public function __construct($verificationToken) {
        $this->verificationToken = $verificationToken;
    }

    public function build() {
       return $this->markdown('emails.verification');
    }
}

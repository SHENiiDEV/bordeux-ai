<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactMessageMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $name,
        public string $email,
        public string $subjectText,
        public string $messageText
    ) {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "Support Ticket: {$this->subjectText}",
            replyTo: [$this->email],
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.contact_message',
            with: [
                'name' => $this->name,
                'email' => $this->email,
                'subjectText' => $this->subjectText,
                'messageText' => $this->messageText,
            ],
        );
    }

    public function attachments(): array
    {
        return [];
    }
}

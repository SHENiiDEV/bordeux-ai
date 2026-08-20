<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class NewApplicationAdminMail extends Mailable
{
    use Queueable, SerializesModels;

    public array $applicationData;

    public function __construct(array $applicationData)
    {
        $this->applicationData = $applicationData;
    }

    public function build()
    {
        $candidateName = $this->applicationData['name'] ?? 'Candidate';
        return $this->subject("[NEW VIP APPLICATION] Candidate: {$candidateName}")
                    ->view('emails.new_application_admin');
    }
}

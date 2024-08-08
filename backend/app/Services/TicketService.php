<?php
namespace App\Services;

use App\Models\Ticket;

class TIcketService {
    public function getTicket($email) {
        $tickets = Ticket::where('email', $email)->get();
        if ($tickets->isEmpty()) {
            return response()->json(['message' => 'No ticket found'], 404);
        }
        return ['status' => 200, 'tickets' => $tickets];
    }
}

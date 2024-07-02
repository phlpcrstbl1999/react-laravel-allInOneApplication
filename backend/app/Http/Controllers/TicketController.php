<?php

namespace App\Http\Controllers;
use App\Models\Ticket;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    public function getTicket(Request $request) {
        $tickets =Ticket::where('email', $request->email)->get();
        if ($tickets->isEmpty()) {
            return response()->json(['message' => 'No ticket found'], 404);
        }
        return response()->json($tickets, 200);
    }
}

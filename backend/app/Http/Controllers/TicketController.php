<?php

namespace App\Http\Controllers;
use App\Models\Ticket;
use App\Services\TIcketService;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    protected $ticketService;

    public function __construct(TIcketService $ticketService)
    {
        $this->ticketService = $ticketService;
    }
    public function getTicket(Request $request)
    {
        $response = $this->ticketService->getTicket($request->email);
        if ($response['status'] === 404) {
            return response()->json(['message' => $response['message']], $response['status']);
        }
        return response()->json($response['tickets'], $response['status']);
    }
}

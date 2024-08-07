<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Services\AuthService;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function verify(Request $request)
    {
        $response = $this->authService->verify($request->email);
        return response()->json(['message' => $response['message']], $response['status']);
    }

    public function verifyEmail(Request $request)
    {
        $response = $this->authService->verifyEmail($request->token);
        return response()->json(['message' => $response['message']], $response['status']);
    }

    public function register(Request $request)
    {
        $response = $this->authService->registerUser($request->email, $request->password);
        return response()->json(['message' => $response['message']], $response['status']);
    }

    public function login(Request $request)
    {
        $response = $this->authService->login($request->email, $request->password);
        if ($response['status'] === 201) {
            return response()->json(['access_token' => $response['access_token']], $response['status']);
        }

        return response()->json(['message' => $response['message']], $response['status']);
    }
}

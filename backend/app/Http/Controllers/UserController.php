<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getUserByToken(Request $request) {
        $user = User::where('remember_token', $request->token)->first();
        if(!$user) {
            return response()->json(['message' => 'Invalid token'], 404);
        }

        return response()->json($user, 200);
    }
}

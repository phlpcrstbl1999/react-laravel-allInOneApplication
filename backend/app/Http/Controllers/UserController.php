<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getUserByToken(Request $request) {
        $user = User::select('users.*', 'departments.dept_name')
        ->join('departments', 'users.dept_id', '=', 'departments.dept_id')
        ->where('remember_token', $request->token)
        ->first();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json($user, 200);
    }
}

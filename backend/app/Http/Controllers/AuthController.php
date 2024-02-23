<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function verify(Request $request) {
        $users = User::where('email', $request->email)->get();

        if ($users->isEmpty()) {
            return response()->json([
                'message' => 'No user found with the provided email.',
            ], 404);
        }

        foreach($users as $user) {
            $name = $user->user_mname;
            $activeTag = $user->active_tag;
        }
        // $userNames = $users->pluck('user_fname');
        if($activeTag == 'Y' ? $message = 'User already verified' : $message = '');
        return response()->json([
            'message' => 'Users found with the provided email.',
            'user_names' => $message,
        ], 200);
    }
}

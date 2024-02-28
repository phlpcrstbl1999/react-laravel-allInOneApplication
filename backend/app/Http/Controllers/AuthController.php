<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Dotenv\Exception\ValidationException;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function verify(Request $request) {
        try {
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
            if($activeTag == 'Y') {
                return response()->json([
                    'message' => 'User already verified',
                ], 403);
            }

            return response()->json([
                'message' => 'Users found with the provided email.',
                'user_names' => $name,
            ], 200);
        }catch(ValidationException $e) {
            return response()->json([
                'message' => 'Verification failed',
                'errors' => $e,
            ], 500);
        }
    }

    public function login(Request $request) {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $user = User::where('email', $request->email)->firstOrFail();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['access_token' => $token], 201);
    }
}

<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Dotenv\Exception\ValidationException;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use App\Mail\EmailVerification;
class AuthController extends Controller
{
    public function verify(Request $request) {
        $verificationToken = Str::random(32);
        try {
            $user = User::where('email', $request->email)->first();

            if (!$user) {
                return response()->json([
                    'message' => 'No user found with the provided email.',
                ], 404);
            }

            $name = $user->user_mname;
            $activeTag = $user->active_tag;
            $email = $user->email;

            // $userNames = $users->pluck('user_fname');
            if($activeTag == 'Y') {
                return response()->json([
                    'message' => 'User already verified',
                ], 403);
            }else {
                $user->verification_token = $verificationToken;
                $user->save();
                // try {
                //     Mail::to($email)->send(new EmailVerification($verificationToken));
                //     return response()->json(['message' => 'Verification email sent'], 200);
                // } catch (ValidationException $e) {
                //     return response()->json(['message' => $email], 500);
                // }
                return response()->json([
                    'message' => $verificationToken,
                ], 200);
            }

            return response()->json([
                'message' => 'Users found with the provided email.',
                'user_names' => $email,
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

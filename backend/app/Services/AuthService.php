<?php
namespace App\Services;

use App\Models\User;
use Illuminate\Support\Str;
use App\Mail\EmailVerification;
use Illuminate\Support\Facades\Mail;
use Dotenv\Exception\ValidationException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthService {

    public function verify($email) {
        $verificationToken = Str::random(32);
        try {
            $user = User::where('email', $email)->first();

            if (!$user) {
                return ['status' => 404, 'message' => 'No user found with the provided email.'];
            }

            $activeTag = $user->active_tag;
            $email = $user->email;

            if($activeTag == 'Y') {
                return ['status' => 403, 'message' => 'User already verified'];
            }else {
                $user->verification_token = $verificationToken;
                $user->save();
                try {
                    Mail::to($email)->send(new EmailVerification($verificationToken));
                    return ['status' => 200, 'message' => 'Verification email sent'];
                } catch (ValidationException $e) {
                    return ['status' => 500, 'message' => 'Failed to send email'];
                }
                return ['status' => 200, 'message' =>  $verificationToken];
            }
            return ['status' => 200, 'message' => 'Users found with the provided email.', 'user_names' => $email];
        }catch(ValidationException $e) {
            return ['status' => 500, 'message' => 'Verification failed', 'user_names' => $e];
        }
    }


    public function verifyEmail($token) {
        $user = User::where('verification_token', $token)->first();
        if(!$user) {
            return ['status' => 404, 'message' => 'Invalid token'];
        }
        $user->email_verified_at = now();
        $user->save();
        $activeTag = $user->active_tag;
        if($activeTag == 'Y') {
            return ['status' => 403, 'message' => 'Already Registered, Please Sign In'];
        }
        return ['status' => 200, 'message' => $user];
    }
    public function registerUser($email, $password)
    {
        $user = User::where('email', $email)->first();
        $hashedPassword = Hash::make($password);

        if ($user) {
            $user->password = $hashedPassword;
            $user->active_tag = 'Y';
            $user->date_registered = now();
            $user->save();

            return ['status' => 201, 'message' => 'Registration Successful'];
        }

        return ['status' => 400, 'message' => 'Registration failed'];
    }

    public function login($email, $password)
    {
        if (!Auth::attempt(['email' => $email, 'password' => $password])) {
            return ['status' => 401, 'message' => 'Invalid credentials'];
        }

        $user = User::where('email', $email)->firstOrFail();
        $token = $user->createToken('auth_token')->plainTextToken;
        $user->remember_token = $token;
        $user->save();

        return ['status' => 201, 'access_token' => $token];
    }
}
?>

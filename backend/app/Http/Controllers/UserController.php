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

    public function uploadProfile(Request $request) {

        if ($request->hasFile('image')) {
            $uploadedFile = $request->file('image');
            $user_id = $request->user_id;
            $filename = $user_id . '.' . $uploadedFile->getClientOriginalExtension();
            $uploadedFile->move(public_path('users-profile'), $filename);
            $imageUrl = url('users-profile/' . $filename);
            $user = User::where('user_id', $request->user_id)->first();
            $user->profile_path = $imageUrl;
            $user->save();
            return response()->json(['image_url' => $imageUrl]);
        }else {
            return response()->json(['error' => 'No file uploaded'], 400);
        }
    }
}

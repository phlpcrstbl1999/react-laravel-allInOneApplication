<?php

namespace App\Http\Controllers;

use App\Models\Api_key;
use Illuminate\Http\Request;
use Dotenv\Exception\ValidationException;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class APIKeyController extends Controller
{
    public function getApiKey(Request $request) {
        try {
        $apikey = Api_key::where('name', 'accessToken')->first();
        $apikey->value = $request->key;
        $apikey->save();
        return response()->json([
            'message' => $request->key,
        ], 201);
    } catch (ValidationException $e) {
        return response()->json([
            'message' => 'Update Unsuccessful',
            'errors' => $e,
        ], 400);
    }
}

public function proxyLogin() {
        $apiUrl = env('API_LOGIN_URL');
        $companyWebsite = env('COMPANY_WEBSITE');
        $publicIP = env('PUBLIC_IP');

        $data = [
            'hmac_email' => env('HMAC_EMAIL'),
            'client_id' => (int)env('CLIENT_ID', 10),
            'client_secret' => env('CLIENT_SECRET'),
            'password' => env('PASSWORD')
        ];

        try {
            $response = Http::withOptions([
                'verify' => false,
            ])->withHeaders([
                'Accept' => 'application/json',
                'Content-Type' => 'application/json',
                'Origin' => $companyWebsite,
                'X-Forwarded-For' => $publicIP,
            ])->post($apiUrl, $data);

            return $response->json();
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Internal Server Error' . $e
            ], 500);
        }
    }

    public function getAgents() {
        $apiUrl = env('API_GET_AGENT_URL');
        $companyWebsite = env('COMPANY_WEBSITE');
        $publicIP = env('PUBLIC_IP');
        $apikey = Api_key::where('name', 'accessToken')->first();
        $accessToken = $apikey->value;
        try {
            $response = Http::withOptions([
                'verify' => false,
            ])->withHeaders([
                'Accept' => 'application/json',
                'Content-Type' => 'application/json',
                'Origin' => $companyWebsite,
                'accessToken' => $accessToken,
                'X-Forwarded-For' => $publicIP,
            ])->get($apiUrl);

        if ($response->status() === 401) {
            Log::error('Invalid access token');
            return response()->json([
                'error' => 'Invalid access token'
            ], 401);
        }
            return $response->json();
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Internal Server Error' . $e
            ], 500);
        }
    }
}

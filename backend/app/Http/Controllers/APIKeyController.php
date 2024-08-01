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
        $apiUrl = 'https://staging.insurance.gov.ph/agents/login';
        $companyWebsite = 'https://philfirstinsurance.com.ph';
        $publicIP = '192.250.235.49';

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
        $apiUrl = 'https://staging.insurance.gov.ph/agents/company/agents';
        $companyWebsite = 'https://philfirstinsurance.com.ph';
        $publicIP = '192.250.235.49';
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

            return $response->json();
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Internal Server Error' . $e
            ], 500);
        }
    }
}
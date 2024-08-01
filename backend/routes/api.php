<?php

use App\Http\Controllers\APIKeyController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/auth/verify', [AuthController::class, 'verify']);
Route::post('/auth/verifyEmail', [AuthController::class, 'verifyEmail']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/user', [UserController::class, 'getUserByToken']);
Route::post('/user/upload', [UserController::class, 'uploadProfile']);
Route::post('/user/update', [UserController::class, 'updateProfile']);
Route::post('/helpdesk/ticket', [TicketController::class, 'getTicket']);
Route::post('/agent/key', [APIKeyController::class, 'getApiKey']);
Route::post('/proxy/agents/login', [APIKeyController::class, 'proxyLogin']);
Route::post('/agents', [APIKeyController::class, 'getAgents']);


<?php

use App\Http\Controllers\ChatController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
//all routes have a `api` prefix
Route::post('/chat/rooms', [ChatController::class, 'rooms'])->name('get.rooms');//gets existing rooms
Route::post('/chat/rooms/{roomId}/messages', [ChatController::class, 'messages'])->name('get.room.messages');//downloads messages assigned to a room
Route::post('/chat/rooms/{roomId}/message', [ChatController::class, 'newMessage'])->name('send.new.message');//sends a new message
Route::post('/chat/room/{roomId}/privilages', [ChatController::class, 'getPrivilages'])->name('get.room.privilages');//downloads users authorized to send and read messages
Route::post('/chat/create/room', [ChatController::class, 'createNewRoom'])->name('create.new.room');//creates new chat room

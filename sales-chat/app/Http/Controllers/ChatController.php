<?php

namespace App\Http\Controllers;

use App\Models\ChatUsers;
use Illuminate\Http\Request;
use App\Models\ChatRoom;
use App\Models\ChatMessage;
use Illuminate\Support\Facades\Auth;
use App\Events\NewChatMessage;
use Illuminate\Support\Facades\DB;

class ChatController extends Controller
{
    public function rooms(Request $request){
        $user_id = $request->user_id;
       return ChatRoom::whereIn('id', function($query) use ($user_id) {
                $query->select('chat_room_id')
                      ->from('chat_users')
                      ->whereRaw('chat_users.user_id = '. $user_id);
            })->get();
//        return ChatRoom::select('chat_rooms.*')->join('chat_users', 'chat_rooms.id', '=', 'chat_users.chat_room_id')->whereIn('chat_users.id', '=', Auth::id())->get();
        exit();
    }
    public function messages(Request $request, $roomId){
        return ChatMessage::where('chat_room_id', $roomId)
            ->with('user')
            ->orderBy('created_at', 'DESC')
            ->get();
    }
    //
    public function newMessage(Request $request, $roomId){
        $newMessage = new ChatMessage;
        $newMessage->user_id = $request->user_id;
        $newMessage->chat_room_id = $roomId;
        $newMessage->message = $request->message;
        $newMessage->save();
        broadcast(new NewChatMessage($newMessage))->toOthers();
        return $newMessage;
    }
    public function getPrivilages(Request $request, $roomId){
        if(DB::table('chat_users')->select('admin')->where('room_id', $roomId)->where('user_id', $request->user_id)){
            return 1;
        }else{
            return 0;
        }
    }
    public function createNewRoom(Request $request){

        $user = $request->user_id;
        $roomName = $request->room_name;
        $chatMembers = $request->chat_members;
        $room = new ChatRoom();
        $room->name = $roomName;
        $room->private = 1;
        $room->save();

        $setadmin = ChatUsers::create([
            'chat_room_id' => $room->id,
            'user_id' => $user,
            'blocked' => 0,
            'admin' =>1
        ]);
        $setadmin->save();
        foreach ($chatMembers as $CM){
            $newMemeber = ChatUsers::create([
                'chat_room_id' => $room->id,
                'user_id' => $CM,
                'blocked' => 0,
                'admin' =>0
            ]);
            $newMemeber->save();
        }
        return response()->json(['room_id' => $room->id], 200);

    }

}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatUsers extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    public static function assingToDefaults($user_id){
        $general = ChatUsers::create([
            'chat_room_id' => 1,
            'user_id' => $user_id,
            'blocked' => 0,
            'admin' =>0
        ]);
        $general->save();
        $tech = ChatUsers::create([
            'chat_room_id' => 2,
            'user_id' => $user_id,
            'blocked' => 0,
            'admin' =>0
        ]);
        $tech->save();
        $other = ChatUsers::create([
            'chat_room_id' => 3,
            'user_id' => $user_id,
            'blocked' => 0,
            'admin' =>0
        ]);
        $other->save();
        return 1;
    }

    public static function createPrivateRooms($user_id, $user_name){
        $users = User::getUsersToCreatePrivateRooms($user_id);
        foreach ($users as $us){
            $room = new ChatRoom();
            $room->name = '{"'.$us['id'].'": "'.$user_name.'", "'.$user_id.'": "'.$us['name'].'"}';
            $room->private = 1;
            $room->save();
            $setFirst = ChatUsers::create([
                'chat_room_id' => $room->id,
                'user_id' => $user_id,
                'blocked' => 0,
                'admin' =>0
            ]);
            $setFirst->save();
            $setSecond = ChatUsers::create([
                'chat_room_id' => $room->id,
                'user_id' => $us['id'],
                'blocked' => 0,
                'admin' =>0
            ]);
            $setSecond->save();
        }
    }
}

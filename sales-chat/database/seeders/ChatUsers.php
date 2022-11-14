<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ChatUsers extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::table('chat_users')->insert([
            'chat_room_id'=> 1,
            'user_id' => 1,
            'blocked' => 0,
            'admin' =>1
        ]);
        DB::table('chat_users')->insert([
            'chat_room_id'=> 1,
            'user_id' => 2,
            'blocked' => 0,
            'admin' =>0
        ]);
        DB::table('chat_users')->insert([
            'chat_room_id'=> 2,
            'user_id' => 1,
            'blocked' => 0,
            'admin' =>1
        ]);
        DB::table('chat_users')->insert([
            'chat_room_id'=> 3,
            'user_id' => 1,
            'blocked' => 0,
            'admin' =>1
        ]);
    }
}

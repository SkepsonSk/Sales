<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ChatRoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('chat_rooms')->insert([
            'name'=>'General',
            'private' => 0
        ]);
        DB::table('chat_rooms')->insert([
            'name'=>'Tech Talk',
            'private' => 0
        ]);
        DB::table('chat_rooms')->insert([
            'name'=>'Other',
            'private' => 0
        ]);
    }
}

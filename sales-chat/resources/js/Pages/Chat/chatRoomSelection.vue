<template>
    <div class="">
        <div class="flex justify-between mb-3">
            <template v-for="(room, index) in rooms">
                <JetButton
                    v-if="!room.private"
                    :key="index"
                    :v-model="room"
                    @click="$emit('roomchanged', room)"
                    class="sm:rounded-lg"
                >

                    {{room.name}}

                </JetButton>
            </template>
        </div>
        <div class="sm:h-20 md:h-96 ">
            <div class="w-80 d-block">
                <v-select
                    v-model="selected"
                    :options="rooms"
                    label="name"
                    track-by="id"
                    @change="$emit('roomchanged', selected)"
                    class="d-block w-60 relative sm:rounded-lg"
                    style="background: white;"
                >
                </v-select>
            </div>
            <div class="h-full overflow-scroll overflow-x-hidden mt-3 relative sm:rounded-lg dark:bg-gray-800">
                <select
                    v-model="selected"
                    @change="$emit('roomchanged', selected)"
                    class="w-full md:w-80 overflow-y-hidden overflow-x-hidden ChatSelection"
                    style=""
                    :size="rooms.length-2"
                    >
                    <template v-for="(room, index) in rooms">
                       <option
                           v-if="room.private"
                           :key="index"
                           :value="room"
                           class="sm:rounded-lg"
                           >

                                {{room.name}}

                   </option>
            </template>

                </select>
            </div>
        </div>
    </div>
</template>

<script>
import {VueSelect} from 'vue-select'
import 'vue-select/dist/vue-select.css';
import JetButton from '@/Jetstream/Button.vue';
export default {
    name: "chatRoomSelection",
    props: ['rooms', 'currentRoom'],
    components: {
        'v-select': VueSelect,
        JetButton
    },
    data: function (){
        return {
            selected: '',
        }
    },
    created() {
        this.selected = this.currentRoom;
    }

}
</script>

<style scoped>

.ChatSelection{
    background-image: none;
    padding-right: 0;
    border: unset;
}
</style>

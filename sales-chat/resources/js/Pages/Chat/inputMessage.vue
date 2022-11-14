<template>
    <div class="relative h-10 m-1 dark:bg-gray-800">
        <div style="border-top: 1px solid rgb(55,55,55);" class="grid grid-cols-6">
            <input type="text"
                  v-model="message"
                  @keyup.enter="sendMessage()"
                  placeholder="Message..."
                  class="rounded col-span-5 outline-none p-1 mt-1  block text-sm font-medium text-gray-900 dark:bg-gray-600 dark:text-gray-200"/>
            <button
                @click="sendMessage()"
                class="place-self-end w-[90%] p-1  mt-1 rounded  bg-teal-700 hover:bg-teal-900 text-white uppercase">
                Send
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: "inputMessage",
    props: ['room'],
    data: function (){
        return{
            message: ''
        }
    },
    methods:{
        sendMessage(){
            if(this.message == ' '){
                return;
            }
            axios.post(route('send.new.message', this.room.id),{
                user_id: this.$page.props.user.id,
                message: this.message
            })
            .then(response => {
                if(response.status == 201){
                    this.message = '';
                    this.$emit('messagesent');
                }
            }).catch(error => {
                console.log(error);
            })
        }
    }
}
</script>

<style scoped>

</style>

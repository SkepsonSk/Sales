<template>
    <div class="h-96 w-full">
        <div class="h-full p-2 flex flex-col-reverse overflow-scroll overflow-x-hidden dark:bg-gray-600">
            <div v-for="(message, index) in messages" :key="index">
                <message-item :message="message" />
            </div>
        </div>
    </div>
</template>

<script>
import MessageItem from "./messageItem";
export default {
    name: "messageContainer",
    components: {MessageItem},
    props: ['messages']
}
</script>

<style scoped>

</style>

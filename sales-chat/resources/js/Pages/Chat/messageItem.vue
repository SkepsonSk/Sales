<template>
    <div>
        <div v-if=" $page.props.user.id == message.user.id" class="w-100 mb-1.5">
            <div class="max-w-[80%] md:max-w-[50%] w-fit  float-right">
                <div class="dark:text-white" style="font-size: .9rem; text-align: right;">
                    {{message.user.name }}
                </div>
                <div class="rounded-l-xl p-1  " style="background: rgb(102,171,215);text-align: right;">
                    {{message.message}}
                </div>
            </div>

        </div>
        <div v-else class="w-100 mb-1.5">
            <div class="max-w-[80%] md:max-w-[50%] w-fit float-left">
                <div class="dark:text-white" style="font-size: .9rem; ">
                {{message.user.name }}
                </div>
                <div class="rounded-r-xl p-1" style="background: rgba(200,200,200)">
                    {{message.message}}
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: "messageItem",
    props: ['message']
}

</script>

<style scoped>

</style>

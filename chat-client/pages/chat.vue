<template>
    <div>
       <div class="row user-list"> 
       <div class="col-md-2"></div>
            <div class="col-md-8">
                <user-search
                    v-model="userId"
                    placeholder="Start typing user name"
                    url="/user"
                    text-field="fullName"
                    value-field="_id"
                    other-field="fullName"
                    :details.sync="userName"
                ></user-search>
            </div>
            <div class="col-md-2">
                <b-button
                    class="btn "
                    type="button"
                    variant="secondary"
                    @click="startChatting()"
                >
                    Start Chat
                </b-button>
            </div>
        </div>
        <chat-box 
        v-if="userId"
        :user-id="userId"
        :user-name="userName"
        />
    </div>
</template>

<script>
import UserSearch from '../components/UserSearch.vue'
import ChatBox from '../components/ChatBox.vue'
export default {
        /*
    |--------------------------------------------------------------------------
    | Component > components
    |--------------------------------------------------------------------------
    */
    components: {
        UserSearch,
        ChatBox
    }, // End of Component > components

    /*
    |--------------------------------------------------------------------------
    | Component > data
    |--------------------------------------------------------------------------
    */
    data() {
        return {
           userName: null,
           userId: null,
        }
    }, // End of Component > data

    /*
    |--------------------------------------------------------------------------
    | Component > computed
    |--------------------------------------------------------------------------
    */
    computed: {
    }, // End of Component > computed

    /*
    |--------------------------------------------------------------------------
    | Component > methods
    |--------------------------------------------------------------------------
    */
    methods: {
    }, // End of Component > methods
} // End of export default
</script>
<style scoped>
.user-list {
  padding-top: 50px;
}
</style>

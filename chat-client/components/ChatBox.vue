<template>
    <div>
        <div class="row">
            <div class="col-md-12">
                <div class="chat-connected">
                    Connected with {{ userName }}
                </div>
                <div ref="chat-list" class="chat-list">
                    <div
                        v-for="(item, index) in data"
                        :key="index"
                        class="chat-item"
                    >
                        <div class="chat-item-box">
                            <div class="chat-descp">
                                <div class="card">
                                    <div class="card-body">
                                        <h4>
                                            {{
                                                item.senderName
                                            }}
                                        </h4>
                                        <p>{{ item.text }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div
            :class="{
                'is-invalid': errors.has('message'),
            }"
            class="send_message"
        >
            <b-form>
                <div class="row">  
                <div class="col-md-12">

                    <b-form-textarea
                    v-model="message"
                    v-validate="{ required: true }"
                    placeholder="Send a message..."
                    rows="3"
                    max-rows="6"
                    data-vv-name="message"
                    @keydown.enter="send()"
                ></b-form-textarea>
                </div>
                
                <div class="col-md-12">
                        <b-button
                            type="button"
                            variant="primary"
                            class="btn-block sign-btn"
                            @click="send()"
                        >
                            Send                        
                        </b-button>
                    </div>
            </div>
            </b-form>
        </div>
    </div>
</template>
<script>
export default {
    /*
    |--------------------------------------------------------------------------
    | Component > name
    |--------------------------------------------------------------------------
    */
    name: 'Chat', // End of Component > name

     /*
    |--------------------------------------------------------------------------
    | Component > props
    |--------------------------------------------------------------------------
    */
    props: {
        userId: {
            required: true,
            type: String,
        },
        userName:{
            required: true,
            type: String,
        }
    }, // End of Component > props

    /*
    |--------------------------------------------------------------------------
    | Component > data
    |--------------------------------------------------------------------------
    */
    data() {
        return {
            url: new this.$resource(`/message`),
            message: null,
            data: []
        }
    }, // End of Component > data

    /*
    |--------------------------------------------------------------------------
    | Component > computed
    |--------------------------------------------------------------------------
    */
    sockets: {
        connect() {
            console.log('Socket connected')
        },
        async receiveMessage(data) {
            console.log(data)
            await this.data.push(data)
            await this.$nextTick()
        },
    }, // End of Component > socket

    /*
    |--------------------------------------------------------------------------
    | Component > computed
    |--------------------------------------------------------------------------
    */
    computed: {
        senderId() {
            if (this.$auth && this.$auth.user && this.$auth.user._id) {
                return this.$auth.user._id
            }
            return null
        },
        senderName() {
            if (this.$auth && this.$auth.user && this.$auth.user.fullName) {
                return this.$auth.user.fullName
            }
            return null
        },
        socketHost() {
            console.log(this.$auth.getToken('local'))
            return `${
                process.env.NUXT_ENV_SOCKET_HOST
            }?token=${this.$auth.getToken('local')}`
        },
    }, // End of Component > computed

    /*
    |--------------------------------------------------------------------------
    | Component > watch
    |--------------------------------------------------------------------------
    */
    watch: {
        async userId(value) {
            if (value && this.$socket && !this.$socket.connected) {
                    await this.$socket.connect(this.socketHost)
                this.data = []
                this.getData()
            }
        }
    }, // End of Component > watch

    /*
    |--------------------------------------------------------------------------
    | Component > mounted
    |--------------------------------------------------------------------------
    */
    async mounted() {
        if (this.$socket) {
            await this.$socket.connect(this.socketHost)
        }
        this.data = []
        this.getData()
    }, // End of Component > mounted

    /*
    |--------------------------------------------------------------------------
    | Component > methods
    |--------------------------------------------------------------------------
    */
    methods: {
        async send() {
            const result = await this.$validator.validateAll()
            if (result) {
                try {
                    const message = {
                        text: this.message,
                        receiverId: this.userId,
                        receiverName: this.userName,
                        senderId: this.senderId,
                        senderName: this.senderName,
                    }

                    if (this.$socket) {
                        if (!this.$socket.connected) {
                            await this.$socket.connect(this.socketHost)
                        }

                        this.$socket.emit('sendMessage', message)
                        this.data.push(message)
                        this.message = ''

                        await this.$nextTick()

                        this.$refs['chat-list'].scrollTop = this.$refs[
                            'chat-list'
                        ].scrollHeight
                    } else {
                        this.$toast.show(
                            'Whoops something went wrong. Please refresh your page'
                        )
                    }
                
                } catch (error) {}
            }
            else {
                this.$toast.show(this.errors.all()[0])
            }
        },
        
        async getData(){
            const { data } = await this.url.list({
                userId: this.userId
            })
            if (data.data.length) {
                this.data  = data.data
            }
        }
    },
    /*
    |--------------------------------------------------------------------------
    | Component > beforeDestroy
    |--------------------------------------------------------------------------
    */
    async beforeDestroy() {
        if (this.$socket && this.$socket.connected) {
            await this.$socket.emit('leaveRoom')
        }
    }, // End of Component > beforeDestroy
}
</script>
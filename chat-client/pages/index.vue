<template>
    <div>
        <div class="auth_form">
            <b-form method="post" novalidate @submit.stop.prevent="onSubmit">
                <div class="row">
                    <div class="col-md-12">
                        <b-form-group
                          id="input-1"
                          label="EMAIL"
                        >
                            <b-form-input
                                id="input-1"
                                v-model="formData.email"
                                v-validate="{
                                    required: true,
                                    email: true,
                                }"
                                :class="{
                                    'is-invalid': errors.has('email'),
                                }"
                                :disabled="loading || disabled"
                                type="email"
                                placeholder="Enter your email address"
                                data-vv-name="email"
                                autocomplete="off"
                            ></b-form-input>
                        </b-form-group>
                    </div>
                    <div class="col-md-12">
                      <b-form-group
                          id="input-group-2"
                          label="PASSWORD"
                          label-for="input-2"
                      >
                          <b-form-input
                              id="input-2"
                              v-model="formData.password"
                               v-validate="{
                                  required: true,
                              }"
                        data-vv-name="password"
                              :class="{
                                    'is-invalid': errors.has('password'),
                                }"
                              :disabled="loading || disabled"
                              type='password'
                              placeholder="Enter your account password"
                          ></b-form-input>
                      </b-form-group>
                  </div>
                    <div class="col-md-12 z-index-9">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <b-form-checkbox
                                        id="checkbox-1"
                                        v-model="formData.remember"
                                        name="checkbox-1"
                                        :value="true"
                                        :unchecked-value="false"
                                        ><span> Remember me</span>
                                    </b-form-checkbox>
                                </div>
                            </div>
                            <div class="col-md-6 register-link-group">
                                <div class="form-group">
                                    <b-button
                                        class="btn btn-link btn-link float-right"
                                        type="button"
                                        variant="secondary"
                                        @click="
                                            $router.push('/register')
                                        "
                                    >
                                       Create New Account
                                    </b-button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <b-button
                            type="submit"
                            variant="primary"
                            :disabled="loading"
                            class="btn-block sign-btn"
                        >
                            Sign In
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
    | Component > data
    |--------------------------------------------------------------------------
    */
    data() {
        return {
            disabled: true,
            formData: {
                email: '',
                password: '',
                remember: false,
            },
            loading: false,
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
    | Component > mounted
    |--------------------------------------------------------------------------
    */
    mounted() {
        this.disabled = false
        if(this.$auth?.user){
            this.$router.push('/chat')
        }
    }, // End of Component > mounted

    /*
    |--------------------------------------------------------------------------
    | Component > methods
    |--------------------------------------------------------------------------
    */
    methods: {
        async onSubmit() {
            this.loading =true

            try {
                const result = await this.$validator.validateAll()

                if (result) {
                    const { data } = await this.$auth.login({
                        data: this.formData,
                    })

                    this.$toast.success(data.message)
                } else {
                    this.$toast.show(this.errors.all()[0])
                }
            } catch (message) {
                this.$toast.show(message)
            }
        this.loading =false

        }, // End of onSubmit() method
    }, // End of Component > methods
} // End of export default
</script>
<style scoped>
.auth_form {
  padding: 50px;
}
.register-link-group {
    @include respond_below(xs) {
        position: absolute;
        left: 0;
        right: 0;
        width: 100%;
        margin: 0 auto;
        bottom: -78px;
        width: 100%;
        .btn {
            margin: 0 auto;
            display: block;
            text-align: center;
            width: 100%;
        }
    }
}
.btn.btn-primary {
    &.btn-link {
        padding: 0;
        font-size: $font-size-base * 0.875;
        position: relative;
        top: 4px;
        background-color: transparent;
        text-transform: none;
        height: auto;
        color: $anchor-color;
        font-family: $font-regular;
        &:focus,
        &:active {
            box-shadow: none;
            color: $anchor-color;
            background-color: transparent;
        }
        &.create_account {
            position: relative;
            top: -3px;
        }
    }
}
.btn-link {
    padding: 0;
    font-size: $font-size-base * 0.875;
    position: relative;
    top: 7px;
    background-color: transparent;
    text-transform: none;
    height: auto;
    &:focus {
        box-shadow: none;
    }
    &.create_account {
        position: relative;
        top: -3px;
    }
}
</style>

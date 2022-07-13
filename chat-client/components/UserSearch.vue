<template>
    <div>
        <vue-bootstrap-typeahead
            ref="typeahead"
            v-model="keyword"
            :data="data"
            :placeholder="placeholder"
            :min-matching-chars="3"
            :serializer="serializer"
            @input="reset"
            @hit="hit"
        />
    </div>
</template>
<script>
import { debounce, map } from 'lodash'
export default {
    /*
    |--------------------------------------------------------------------------
    | Component > props
    |--------------------------------------------------------------------------
    */
    props: {
        placeholder: {
            type: String,
            default: 'Start typing',
        },

        queryLength: {
            type: Number,
            default: 3,
        },

        url: {
            required: true,
            type: String,
        },

        textField: {
            required: true,
            type: String,
        },

        valueField: {
            required: true,
            type: String,
        },

        selected: {
            type: Object,
            default() {
                return {}
            },
        },

        otherField: {
            type: String,
            default: null,
        },

        details: {
            type: [Object, Boolean],
            default() {
                return null
            },
        },
    }, // End of Component > props

    /*
    |--------------------------------------------------------------------------
    | Component > data
    |--------------------------------------------------------------------------
    */
    data() {
        return {
            data: [],
            loading: false,
            selectedAddress: '',
            keyword: '',
        }
    }, // End of Component > data

    /*
    |--------------------------------------------------------------------------
    | Component > computed
    |--------------------------------------------------------------------------
    */
    computed: {
        model: {
            /**
             * Getter to get value for computed property
             * using props from parent componennt
             *
             * @return {mix}
             */
            get() {
                return this.value
            }, // End of get() model

            /**
             * Setter to set value for computed property
             * notifying the parent component
             *
             * @return {void}
             */
            set(value) {
                this.$emit('input', value)

                if (this.otherField) {
                    const details = this.data.find((ele) => {
                        return ele._id === value
                    })

                    if (details)
                        this.$emit('update:details', details[this.otherField])
                }
            }, // End of set() model
        }, // End of Component > computed > model
    }, // End of Component > computed

    /*
    |--------------------------------------------------------------------------
    | Component > watch
    |--------------------------------------------------------------------------
    */
    watch: {
        keyword: debounce(function (query) {
            if (query && query.length >= this.queryLength) {
                query = query.replace(/>/g, '').replace(/ {2,}/g, ' ').trim()
                this.asyncSearch(query)
            }
        }, 1000),
    }, // End of Component > methods

    /*
    |--------------------------------------------------------------------------
    | Component > mounted
    |--------------------------------------------------------------------------
    */
    mounted() {
        if (
            this.selected &&
            this.selected[this.textField] &&
            this.selected[this.valueField]
        ) {
            const item = {}
            item[this.textField] = this.selected.fullName
            item[this.valueField] = this.selected._id
            this.data.push(item)
            this.$refs.typeahead.inputValue = this.selected.fullName
        }
    }, // End of Component > mounted

    /*
    |--------------------------------------------------------------------------
    | Component > methods
    |--------------------------------------------------------------------------
    */
    methods: {
        async asyncSearch(query) {
            try {
                this.data = []
                this.loading = true
                const payload = { keyword: query }
                const { data } = await new this.$resource(this.url).list(
                    payload
                )
                if (data.data.length) {
                    map(data.data, (obj) => {
                        if (this.otherField) {
                            return this.data.push({
                                [this.valueField]: obj[this.valueField],
                                [this.textField]: obj[this.textField],
                                [this.otherField]: obj[this.otherField],
                            })
                        } else {
                            return this.data.push({
                                [this.valueField]: obj[this.valueField],
                                [this.textField]: obj[this.textField],
                            })
                        }
                    })
                }
                this.loading = false
            } catch (errors) {
                this.data = []
                this.loading = false
            }
        },

        serializer(item) {
            return item[this.textField]
        },

        hit($event) {
            this.model = $event[this.valueField]
        },

        reset(value) {
            if (!value) {
                this.model = null
            }
        },
    }, // End of Component > mounted
} // End of export default
</script>

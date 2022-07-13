/**
 * Simple RESTful resource class
 */
export default function ({ $axios, redirect }, inject) {
    class Resource {
        constructor(uri) {
            this.uri = uri
        }

        list(query) {
            return $axios({
                url: this.uri,
                method: 'get',
                params: query,
            })
        }

        get(id, query) {
            return $axios({
                url: this.uri + '/' + id,
                method: 'get',
                params: query,
            })
        }

        store(resource) {
            return $axios({
                url: this.uri,
                method: 'post',
                data: resource,
            })
        }

        update(id, resource) {
            return $axios({
                url: this.uri + '/' + id,
                method: 'put',
                data: resource,
            })
        }

        updateWithoutId(resource) {
            return $axios({
                url: this.uri,
                method: 'put',
                data: resource,
            })
        }

        destroy(id, resource) {
            return $axios({
                url: this.uri + '/' + id,
                method: 'delete',
                data: resource,
            })
        }

        destroyWithoutId(data) {
            return $axios({
                url: this.uri,
                method: 'delete',
                data,
            })
        }
    }
    inject('resource', Resource)
}

import Vue from 'vue'
import _ from 'lodash'
import Moment from 'moment'

Vue.filter('requestCompletion', function (value) {
    if (value) {
        const duration = Moment.duration(value, 'hours')

        // Get Days
        const days = Math.floor(duration.asDays()) // .asDays returns float but we are interested in full days only
        let daysFormatted = ''
        daysFormatted = days ? `${days} days ` : '' // if no full days then do not display it at all
        if (days && days === 1) {
            daysFormatted = days ? `${days} day ` : ''
        }

        // Get Hours
        const hours = duration.hours()
        let hoursFormatted = ''
        hoursFormatted = hours ? `${hours} hrs ` : ''
        if (hours && hours === 1) {
            hoursFormatted = hours ? `${hours} hr ` : ''
        }

        // Get Minutes
        const minutes = duration.minutes()
        let minutesFormatted = ''
        minutesFormatted = minutes ? `${minutes} mins` : ''
        if (minutes && minutes === 1) {
            minutesFormatted = minutes ? `${minutes} min` : ''
        }

        const formated = [daysFormatted, hoursFormatted, minutesFormatted].join(
            ''
        )
        if (formated) {
            return [daysFormatted, hoursFormatted, minutesFormatted].join('')
        }
    }
    return 'N/A'
})

Vue.filter('formatDate', function (value) {
    if (value && Moment(String(value)).isValid()) {
        return Moment(String(value)).format('MMM DD, YYYY')
    } else {
        return 'N/A'
    }
})
Vue.filter('formatDuration', function (value) {
    if (value && Moment(String(value)).isValid()) {
        const duration = Moment(value).unix()
        return Moment.utc(duration).format('lll')
    } else {
        return '-'
    }
})
Vue.filter('formatDateAndTime', function (value) {
    if (value && Moment(String(value)).isValid()) {
        return Moment(String(value)).format('MMM DD, YYYY hh:mm A')
    } else {
        return 'N/A'
    }
})

Vue.filter('years', function (value) {
    if (value) {
        return Math.floor(Moment().diff(value, 'years', true))
    }
})

Vue.filter('fixedTwoDigits', function (value) {
    if (value) {
        return value.toFixed(2)
    }
    return value
})

Vue.filter('sentenceCase', function (value) {
    if (value) {
        return value.replace(/\w+/g, _.capitalize)
    }
})

Vue.filter('unEscapeWord', function (value) {
    if (value) {
        return value.replace(/\\/g, '')
    }
})

Vue.filter('capitalize', function (value) {
    if (!value) return '-'
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1).replace(/_/g, ' ')
})

Vue.filter('booleanText', function (value) {
    let val = 'No'
    if (value) {
        val = 'Yes'
    }
    return val
})

Vue.filter('requireText', function (value) {
    let val = 'Not Required'
    if (value) {
        val = 'Required'
    }
    return val
})

Vue.filter('titleCase', function (value) {
    if (value) {
        return _.startCase(value)
    }
})

Vue.filter('productStatus', function (value) {
    if (value) {
        return _.startCase(value)
    }
})

Vue.filter('addSpace', function (item) {
    item = item.replace(/([A-Z])/g, ' $1').trim()
    return item
})

Vue.filter('sellerCentral', function (value) {
    if (!value | !value.length) return 'N/A'
    value = value.filter((x) => x.primary === true)
    if (value.length) {
        return value[0].name
    }
    return 'N/A'
})
Vue.filter('formatDay', function (value) {
    if (value) {
        return Moment(String(value)).format('Do')
    }
})
Vue.filter('formatBillingPeriod', function (value) {
    if (value) {
        return Moment(String(value)).format('MMM D')
    }
})
Vue.filter('upperCase', function (value) {
    if (value) {
        return value.toUpperCase()
    }
})
Vue.filter('prices', function (value) {
    if (value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    } else {
        return 0
    }
})

Vue.filter('pricesToFixedTwo', function (value) {
    if (value) {
        return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    } else {
        return 0.0
    }
})

Vue.filter('subscriptionType', function (value) {
    if (value) {
        value = _.startCase(value)
        return value.split(' ').join(' - ')
    }
})
Vue.filter('requestCompletionScorecard', function (value, type) {
    if (value) {
        const duration = Moment.duration(value, 'hours')

        // Get Days
        const days = Math.floor(duration.asDays()) // .asDays returns float but we are interested in full days only
        let daysFormatted = ''
        daysFormatted = days ? `${days} days ` : '' // if no full days then do not display it at all
        if (days && days === 1) {
            daysFormatted = days ? `${days} day ` : ''
        }

        // Get Hours
        const hours = duration.hours()
        let hoursFormatted = ''
        hoursFormatted = hours ? `${hours} hrs ` : ''
        if (hours && hours === 1) {
            hoursFormatted = hours ? `${hours} hr ` : ''
        }

        // Get Minutes
        const minutes = duration.minutes()
        let minutesFormatted = ''
        minutesFormatted = minutes ? `${minutes} mins` : ''
        if (minutes && minutes === 1) {
            minutesFormatted = minutes ? `${minutes} min` : ''
        }

        const formated = [daysFormatted, hoursFormatted, minutesFormatted].join(
            ''
        )
        if (formated) {
            if (type === 'days' && days > 0) {
                return days
            } else if (type === 'hours' && hours > 0) {
                return hours
            } else if (type === 'minutes' && minutes > 0) {
                return minutes
            } else if (type === 'daysPlaceholder') {
                if (days !== 0 && days > 1) return 'days'
                else if (days === 1) return 'day'
            } else if (type === 'hoursPlaceholder') {
                if (hours > 1) return 'hours'
                else if (hours === 1) return 'hour'
            } else if (type === 'minutesPlaceholder') {
                if (minutes > 1) return 'minutes'
                else if (minutes === 1) return 'minute'
            } else if (!type)
                return [daysFormatted, hoursFormatted, minutesFormatted].join(
                    ''
                )
        }
    }
    return ''
})

Vue.filter('turnAround', function (value) {
    if (value) {
        const duration = Moment.duration(value, 'seconds')

        // Get Days
        const days = Math.floor(duration.asDays()) // .asDays returns float but we are interested in full days only
        let daysFormatted = ''
        daysFormatted = days ? `${days} days ` : '' // if no full days then do not display it at all
        if (days && days === 1) {
            daysFormatted = days ? `${days} day ` : ''
        }

        // Get Hours
        const hours = duration.hours()
        let hoursFormatted = ''
        hoursFormatted = hours ? `${hours} hrs ` : ''
        if (hours && hours === 1) {
            hoursFormatted = hours ? `${hours} hr ` : ''
        }

        // Get Minutes
        const minutes = duration.minutes()
        let minutesFormatted = ''
        minutesFormatted = minutes ? `${minutes} mins` : ''
        if (minutes && minutes === 1) {
            minutesFormatted = minutes ? `${minutes} min` : ''
        }

        const formated = [daysFormatted, hoursFormatted, minutesFormatted].join(
            ''
        )
        if (formated) {
            return [daysFormatted, hoursFormatted, minutesFormatted].join('')
        }
    }
    return 0
})

Vue.filter('truncate', function (value, length) {
    if (value.length > length) {
        return value.substring(0, length) + '..'
    } else {
        return value
    }
})

Vue.filter('formatNumber', function (value) {
    if (value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    } else {
        return 0
    }
})

Vue.filter('price', function (value) {
    if (value) {
        return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    } else {
        return 0.0
    }
})

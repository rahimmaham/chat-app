const mongoose = require('mongoose')
const connection = mongoose.connection

module.exports = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        connection.on('disconnected', function(ref) {
            /**
             * Throw an error on disconnection
             */
            throw new Error('MongoDB disconnected!')
        })
    } catch (error) {
        throw new Error(error)
    }
}

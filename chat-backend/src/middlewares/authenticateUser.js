import bearerStrategy from 'passport-http-bearer'
import jwt from 'jsonwebtoken'
import passport from 'passport'

/* import models */
import AccessTokenModel from '../models/Token'
import UserModel from '../models/User'

/* verification of token */
passport.use(
    new bearerStrategy(async (token, done) => {
        /* if no token is passed return */
        if (!token) {
            return done(null, false)
        } else {
            try {
                /*  verify token with secret */
                const payload = await jwt.verify(
                    token,
                    process.env.CLIENT_SECRET
                )

                /* fetch access token form database */
                const accessToken = await AccessTokenModel.findOne({
                    _id: payload.accessTokenId,
                })

                /* return in case of token not found or has been revoked */
                if (!accessToken || accessToken.revokedAt) {
                    return done(null, false)
                }

                /* fetch user details form database */
                const user = await UserModel.findOne({
                    _id: payload.userId,
                })

                /* return user with token */
                return done(null, user, payload)
            } catch (error) {
                /* return in case of error*/
                return done(null, false)
            }
        }
    })
)

export default passport.authenticate('bearer', {
    session: false,
})

import dayjs from 'dayjs'
import jwt from 'jsonwebtoken'

/* import models */
import RefreshTokenModel from '../models/RefreshToken'
import AccessTokenModel from '../models/Token'

export default async (user, remember = false) => {
    const tokenExpirationDate = remember
        ? dayjs().add(30, 'days') /* add 30 days to current date */
        : dayjs().add(1, 'days') /* add 1 day to current date */

    const tokenExpirationTimeInSeconds = remember
        ? 24 * 60 * 60 * 30 /* 30 days */
        : 24 * 60 * 60 * 1 /* 1 day */

    /* Save user's access token to the database */
    const accessTokenData = await AccessTokenModel.create({
        userId: user._id,
        revokedAt: null,
        expiresAt: tokenExpirationDate,
    })

    /* Save user's refresh token to the database */
    const refreshTokenData = await RefreshTokenModel.create({
        accessTokenId: accessTokenData._id,
        revokedAt: null,
        expiresAt: tokenExpirationDate,
    })

    const accessToken = jwt.sign(
        {
            accessTokenId: accessTokenData._id,
            userId: user._id,
            clientId: process.env.CLIENT_ID,
        },
        process.env.CLIENT_SECRET,
        {
            expiresIn: tokenExpirationTimeInSeconds,
        }
    )

    const refreshToken = jwt.sign(
        {
            refreshTokenId: refreshTokenData._id,
            userId: user._id,
            clientId: process.env.CLIENT_ID,
        },
        process.env.CLIENT_SECRET,
        {
            expiresIn: tokenExpirationTimeInSeconds,
        }
    )

    return {
        accessToken,
        id: user._id,
        refreshToken,
        tokenExpirationDate,
    }
}

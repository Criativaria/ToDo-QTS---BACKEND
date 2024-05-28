import jwt from 'jsonwebtoken'

type ValidationResult<T> = { isValid: boolean, payload: T }

export class AuthService {

    public static genToken(payload: object) {

        return jwt.sign(payload, process.env.JWT_SECRET!, {
            algorithm: "HS256",
            expiresIn: "2d"
        })

    }

    public static validateToken<T>(token: string) {
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET!) as T
            return { isValid: true, payload }
        } catch (error) {
            console.log(error)
        }
        return { isValid: false, payload: null }
    }

}
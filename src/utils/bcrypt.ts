import bycrypt from 'bcryptjs'

export async function hashPassword(password: string) {
    return bycrypt.hash(password, 12)
}

export async function checkPassword(password: string, hashed: string) {
    return bycrypt.compare(password, hashed)
}
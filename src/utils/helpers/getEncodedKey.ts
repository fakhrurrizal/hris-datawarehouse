import { createHmac } from 'crypto'

export default function getEncodedKey() {
    // Generate HMAC and add to the request headers
    const secret = process.env.NEXT_PUBLIC_KEY || ''
    const secretKey = generateSecretKey()
    const hmac = calculateHMAC(secretKey, secret)
    const encodedKey = encodeBase64(secretKey, hmac)

    return encodedKey
}

// Fungsi untuk generate random secret key
function generateSecretKey(): string {
    const array = new Uint32Array(10)
    window.crypto.getRandomValues(array)

    return Array.from(array, dec => dec.toString(16)).join('')
}

// Fungsi untuk menghitung HMAC dengan secret
function calculateHMAC(secretKey: string, secret: string): string {
    const hmac = createHmac('sha256', secret)

    return hmac.update(secretKey).digest('hex')
}

// Fungsi untuk encode secret key dan HMAC menggunakan Base64
function encodeBase64(secretKey: string, hmac: string): string {
    const combined = `${secretKey}:${hmac}` // Gabungkan secretKey dan HMAC

    return btoa(combined) // Encode dalam Base64
}

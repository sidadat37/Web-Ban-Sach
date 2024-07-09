// src/lib/commerce.js
import Commerce from '@chec/commerce.js'

const checPublicKey = import.meta.env.VITE_CHEC_PUBLIC_KEY

if (!checPublicKey) {
  throw new Error('Your public API key must be provided as an environment variable named VITE_CHEC_PUBLIC_KEY')
}

export const commerce = new Commerce(checPublicKey, true)

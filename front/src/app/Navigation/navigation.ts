
/**
 * /handshake - como primer y único endpoint por ahora. Pensé que necesitaba hacer un handshake aquí también, pero eso es solo para los webhooks. En este caso, como usamos Monday como BD no hace falta. Simplemente llamamos a este endpoint directamente y obtenemos lo primero ya.
 */
export const baseUrl: string = 'http://localhost:3000/monday';
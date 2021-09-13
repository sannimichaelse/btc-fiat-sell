import jayson, { HttpClientOptions } from 'jayson'
import { v4 as uuidv4 } from 'uuid'

const host = 'localhost'
const port = process.env.RPC_PORT // default port
const environment = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'

export type TBitcoinRpcResponse = {
  id: string
  result: any
}

const encodedUsernameAndPassword = Buffer.from(`${process.env.RPC_USERNAME}:${process.env.RPC_PASSWORD}`).toString('base64')
let jClientOptions: HttpClientOptions = { host, port, headers: {
    'Authorization': `Basic ${encodedUsernameAndPassword}` 
}}


let client = environment === 'development' ? jayson.Client.http(jClientOptions) : jayson.Client.https(jClientOptions)

export const getBalance = (): Promise<TBitcoinRpcResponse> => {
  return request('getbalance', [])
}

export const getNewAddressForWallet = async (walletName:string): Promise<TBitcoinRpcResponse> => {
  return request('getnewaddress', [], `/wallet/${walletName}`)
}

// generate some blocks
export const generateToAddress = async (blocks: number, walletAddress: string, walletName: string): Promise<TBitcoinRpcResponse> => {
  return request('generatetoaddress', [blocks, walletAddress], `/wallet/${walletName}`)
}

// send funds
export const sendToAddress = async (walletAddress: string, amount: number, walletName: string): Promise<TBitcoinRpcResponse> => {
  return request('sendtoaddress', [walletAddress, amount], `/wallet/${walletName}`)
}

export const getWalletInfo = async (walletName:string): Promise<TBitcoinRpcResponse> => {
  return request('getwalletinfo', [], `/wallet/${walletName}`)
}

export const createWallet = async (walletName: string): Promise<TBitcoinRpcResponse> => {
    return request('createwallet', [walletName])
}

export const request = (method: string, params: Array<any>, path?: string): Promise<any | never> => {
  return new Promise((resolve, reject) => {
    const id = uuidv4()

    if (path) {
        jClientOptions = {
            ...jClientOptions,
            path
        }

        client = environment === 'development' ? jayson.Client.http(jClientOptions) : jayson.Client.https(jClientOptions)
    }

    client.request(method, params, id, (error, response) => {
      if (error) reject(error)
      else if (response.error) reject(response)
      else resolve(response)
    })
  })
}

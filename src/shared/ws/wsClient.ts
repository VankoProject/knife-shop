import type { WsEvent } from './types'

interface WsClient {
  connect: () => void
  disconnect: () => void
}

export function createWsClient(
  url: string,
  onMessage: (event: WsEvent) => void
): WsClient {
  let socket: WebSocket | null = null

  function handleMessage(message: MessageEvent<string>): void {
    try {
      onMessage(JSON.parse(message.data) as WsEvent)
    } catch {
      // Ignore invalid WebSocket messages.
    }
  }

  function connect(): void {
    if (socket !== null) return

    socket = new WebSocket(url)
    socket.addEventListener('message', handleMessage)
    socket.addEventListener('close', () => {
      socket = null
    })
  }

  function disconnect(): void {
    if (socket === null) return

    socket.removeEventListener('message', handleMessage)
    socket.close()
    socket = null
  }

  return {
    connect,
    disconnect
  }
}

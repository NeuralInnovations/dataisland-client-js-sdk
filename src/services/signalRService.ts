import { Service, ServiceContext } from "./service"
import * as signalR from "@microsoft/signalr"

export interface OrganizationUpdate {

}

export interface WorkspaceUpdate {

}

export interface GroupUpdate {

}

export interface ChatUpdate {

}

export interface FileUpdate {

}

export interface UserUpdate {

}

export interface SendMessage {

}

export class SignalRService extends Service {
  constructor(
    serviceContext: ServiceContext,
    /**
     * Host of the RPC service.
     * It is not used if you use the `urlBuilder` option.
     */
    public readonly host: string,
    /**
     * Options for the RpcService.
     */
    private readonly options?: {
      // make it possible to override the url builder
      urlBuilder?: (path: string) => URL
    }
  ) {
    super(serviceContext)

    serviceContext.onStart = async () => {
      await this.start()
      serviceContext.lifetime.addCallback(this.stop, this)
    }
  }

  private _hubConnection?: signalR.HubConnection

  async start(): Promise<void> {
    this._hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${this.host}`, {
        headers: {
          "Authorization": "Debug Composite/LOCAL_O8I46FKM6076QU3335UL/auth0|656497819600475dd2e8c40f/andrii.chuiashenko@ni.solutions\n"
        }
      })
      .build()

    this.subscribe<OrganizationUpdate>("OrganizationUpdate", (data: OrganizationUpdate) => {
      console.log(data)
    })
    this.subscribe<WorkspaceUpdate>("WorkspaceUpdate", (data: WorkspaceUpdate) => {
      console.log(data)
    })
    this.subscribe<GroupUpdate>("GroupUpdate", (data: WorkspaceUpdate) => {
      console.log(data)
    })
    this.subscribe<ChatUpdate>("ChatUpdate", (data: WorkspaceUpdate) => {
      console.log(data)
    })
    this.subscribe<FileUpdate>("FileUpdate", (data: WorkspaceUpdate) => {
      console.log(data)
    })
    this.subscribe<UserUpdate>("UserUpdate", (data: WorkspaceUpdate) => {
      console.log(data)
    })
    this.subscribe<SendMessage>("SendMessage", (data: WorkspaceUpdate) => {
      console.log(data)
    })

    await this._hubConnection.start()
  }

  async stop(): Promise<void> {
    await this._hubConnection!.stop()
  }

  async update(resourceId: string, id: string): Promise<void> {
    await this._hubConnection!.send("/api/v1/Updates/update", resourceId, id)
  }

  subscribe<T>(path: string, callback: (data: T) => void): void {
    const hub: signalR.HubConnection = this._hubConnection!
    hub.on(path, (message: string) => {
      console.log(message)
      const json = JSON.parse(message)
      console.log(json)
      const data = json.dto as T
      callback(data)
    })
  }
}

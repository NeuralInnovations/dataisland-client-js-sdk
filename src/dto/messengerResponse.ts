


export interface MessengerAccountDto {
  organizationId: string
  name: string
  accountId: string
  token: string
  language: string
  accountContext: string
  referralUrl: string
  notificationDelays: number[]
}

export interface MessengerAccountCutDto{
  id: string
  name: string
}

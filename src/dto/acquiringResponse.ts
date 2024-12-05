import { SegmentItemData } from "./limitsResponse"

export interface OrderResponse {
  data: OrderData
}

export interface OrderData {
  data: string,
  orderId: string,
  signature: string
}

export interface UnsubscribeResponse {
  isSuccessful: boolean
  orderId: string
}

export interface GetOrderStateResponse {
  isValid: boolean,
  state: OrderState,
  plan: AcquiringPlan
}

export interface AcquiringPlansResponse {
  plans: AcquiringPlan[]
  limitSegments: AcquiringSegmentData[]
}

export interface UserAcquiringPlan {
  isValid: boolean,
  state: OrderState,
  plan: AcquiringPlan
}

export interface AcquiringPlan {
  key: string,
  segmentKey: string,
  price: number,
  currency: string,
  periodicity: number,
  description: string,
  isEnabled: boolean
}

export interface AcquiringSegmentData {
  key: string
  dayItems: SegmentItemData[]
}

export enum OrderState {
  Created = 0,
  WaitingForPayment = 10,
  Paid = 20,
  Cancelled = 30
}

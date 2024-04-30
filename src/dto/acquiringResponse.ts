import { SegmentItemData } from "./limitsResponse"

export interface CreateOrderResponse {
    data: CreateOrederData
}

export interface CreateOrederData {
    data: string,
    signature: string
}

export interface AcquiringPlansResponse {
    plans: AcquiringPlan[]
    limitSegments: AcquiringSegmentData[]
}

export interface UserAcquiringPlan{
    isValid: boolean,
    state: OrderState,
    plan: AcquiringPlan
}

export interface AcquiringPlan{
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

export enum OrderState
{
    Reserved = 0,
    Paid = 10,
    Verified = 20,
    Suspended = 30,
    Canceled = 100
}
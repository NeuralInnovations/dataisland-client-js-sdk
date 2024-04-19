
export interface SegmentsData {
    segments: SegmentData[]
}

export interface SegmentData {
    key: string
    isRegisteredDefault: boolean
    isAnonymousDefault: boolean
    isAnonymous: boolean
    isRegistered: boolean
    dayItems: SegmentItemData[]
}

export interface SegmentItemData{ 
    daysCount: number
    actionItems: SegmentActionData[]
}

export interface SegmentActionData {
    type: LimitActionType
    countLimit: number
    tokenLimit?: number
}

export enum LimitActionType {
    UploadFile = 0,
    CreateChat = 1,
    AskQuestion = 2,
    CreateWorkspace = 3,
    CreateOrganization = 4,
    FileSizeKb = 5
}
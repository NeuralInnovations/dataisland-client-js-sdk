export interface StatisticsResponse {
    dateFrom: string
    dateTo: string
    data: StatisticsData[]
}

export interface StatisticsData {
    date: string
    promptUsage: string
    completionUsage: number
}


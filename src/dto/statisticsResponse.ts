export interface StatisticsResponse {
    dateFrom: number
    dateTo: number
    data: StatisticsData[]
}

export interface StatisticsData {
    date: number
    promptUsage: number
    completionUsage: number
}


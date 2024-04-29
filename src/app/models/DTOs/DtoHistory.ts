export interface DtoHistory{
    data:[
         historyItem
    ]
}
export interface historyItem{
    changeId: string;
    id: string;
    name: string;
    url: string;
    urlResolved: string;
    homepage: string;
    favicon: string;
    tags: string[];
    country: string;
    countryCode: string;
    state: string;
    language: string[];
    votes: number;
    lastChangeTime: Date;
    codec: string;
    bitrate: number;
    hls: boolean;
    lastCheckOk: boolean;
    lastCheckTime: Date;
    lastCheckOkTime: Date;
    lastLocalCheckTime: Date;
    clickTimestamp: Date;
    clickCount: number;
    clickTrend: number;
}
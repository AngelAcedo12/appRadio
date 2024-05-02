import { historyItem } from "./DtoHistory";

export interface DtoProfile {
    name: string;
    email: string;
    imgProfile: string;
    history: historyItem[]
}

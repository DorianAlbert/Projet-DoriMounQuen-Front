import { AIExchangeOut } from "../types";

export interface AIResponseProps {
    data: AIExchangeOut
}

export default function AIResponse({data}: AIResponseProps) {
    return <div>
        {data.response}
    </div>
}
import ReactMarkdown from "react-markdown";
import { AIExchangeOut } from "../types";

export interface AIResponseProps {
    data: AIExchangeOut
}

export default function AIResponse({data}: AIResponseProps) {
    return <ReactMarkdown>
        {data.response}
    </ReactMarkdown>
}
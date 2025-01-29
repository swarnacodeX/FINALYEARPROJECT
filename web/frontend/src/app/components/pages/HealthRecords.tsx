"use client"
import { LabelInputContainer} from "./Login";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { useState,useEffect,useRef } from "react";
export default function RecordPage(){
    const query=useRef<HTMLInputElement>(null);
    async function Submit(){
        try {
          const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer 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',
            },
            body: JSON.stringify({
              model: "nvidia/llama-3.1-nemotron-70b-instruct",
              messages: [{ role: "user", content: query.current?.value }],
              temperature: 0.5,
              top_p: 1,
              max_tokens: 1024,
              stream: false,
            }),
          });
        
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        
          const data = await response.json();
          console.log("AI Response:", data);
        } catch (error) {
          console.error("Error:", error);
        }
        
      }
    const [record, setRecord] = useState([]);
    useEffect(() => {
        const fetchRecord = async () => {
            const response = await fetch('https://example.com/api/record');
            const data = await response.json();
            setRecord(data);
            }
            
            }, []);
            return(
                <div>
                    Manage your Health Records
                    <button>New Record</button>
                    <LabelInputContainer className="mb-4">
          <Label htmlFor="query">Prompt</Label>
          <Input
            id="query"
            ref={query}
            placeholder="Enter prompt"
            type="text"
          />
        </LabelInputContainer>
        <button onClick={Submit}>Submit</button>
                </div>
            )
}

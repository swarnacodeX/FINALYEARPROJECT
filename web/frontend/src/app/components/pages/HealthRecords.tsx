"use client"
import { useState,useEffect } from "react";
export default function RecordPage(){
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
                </div>
            )
}

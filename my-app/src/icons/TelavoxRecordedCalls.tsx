import React from "react";
import IconProps from "./IconProps";

export default function TelavoxRecordedCalls({
    size = 24,
    color = "black"
}: IconProps) {
    return (
        <svg width={size} height={size} fill={color} viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path fill="none" d="M0,0h24v24H0V0z"/>
            <path d="M21,4H3C1.9,4,1,4.9,1,6v12c0,1.1,0.9,2,2,2h3h12h3c1.1,0,2-0.9,2-2V6C23,4.9,22.1,4,21,4z M21,18h-3.4l-0.4-1
                c-0.1-0.3-0.4-0.5-0.7-0.5h-9c-0.3,0-0.6,0.2-0.7,0.5l-0.4,1H3V6h18V18z M7.3,13.5h9.2c1.4,0,2.5-1.1,2.5-2.5S18,8.5,16.6,8.5H7.3
                c-1.4,0-2.5,1.1-2.5,2.5S5.9,13.5,7.3,13.5z M16.6,9.5c0.8,0,1.5,0.7,1.5,1.5s-0.7,1.5-1.5,1.5c-0.8,0-1.5-0.7-1.5-1.5
                S15.7,9.5,16.6,9.5z M9.3,9.5h5.3c-0.3,0.4-0.5,0.9-0.5,1.5s0.2,1.1,0.5,1.5H9.3c0.3-0.4,0.5-0.9,0.5-1.5S9.6,9.9,9.3,9.5z M7.3,9.5
                c0.8,0,1.5,0.7,1.5,1.5s-0.7,1.5-1.5,1.5S5.8,11.8,5.8,11S6.5,9.5,7.3,9.5z"/>
        </svg>
    )
}
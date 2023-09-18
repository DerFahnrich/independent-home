import React from "react";
import IconProps from "./IconProps";

export default function TelavoxFax({
    size = 24,
    color = "black"
}: IconProps) {
    return (
        <svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                 fill={color} width={size} height={size} viewBox="-467 269 24 24" enableBackground="new -467 269 24 24" xmlSpace="preserve">
            <path fill="none" d="M-467,269h23.9V293H-467V269z"/>
            <path d="M-447,278.1h-1.7v-4.6c0-1.1-0.9-2-2-2h-8.6c-1.1,0-2,0.9-2,2v4.6h-1.7c-1.1,0-2,0.9-2,2v8.3c0,1.1,0.9,2,2,2h16
                c1.1,0,2-0.9,2-2v-8.3C-445,279-445.9,278.1-447,278.1z M-459.3,273.5h8.6v4.6h-8.6V273.5z M-447,288.5h-15.9v-8.3h15.9V288.5z
                 M-458.9,282.5c0,0.7-0.6,1.3-1.3,1.3c-0.7,0-1.3-0.6-1.3-1.3c0-0.7,0.6-1.3,1.3-1.3C-459.5,281.1-458.9,281.8-458.9,282.5z
                 M-452.2,276.9h-5.5v-2h5.5V276.9z"/>
        </svg>
    )
}
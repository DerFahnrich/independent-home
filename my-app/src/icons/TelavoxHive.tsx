import React from "react";
import IconProps from "./IconProps";

export default function TelavoxHive({
   size = 24,
   color = "black"
}: IconProps) {
    return (
        <svg width={size} height={size} fill={color} viewBox="0 0 1000 1000" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path
                id="path52"
                d="M 651,556 583,436 651,316 h 134 l 68,120 -68,120 z M 413,416 345,296 413,176 h 134 l 68,120 -68,120 z M 175,556 107,436 175,316 h 134 l 65,120 -65,120 z m 0,280 -68,-120 68,-120 h 134 l 65,120 -65,120 z M 417,976 345,856 413,736 h 134 l 68,120 -68,120 z M 651,836 583,716 651,596 h 134 l 68,120 -68,120 z" />
        </svg>
    )
}
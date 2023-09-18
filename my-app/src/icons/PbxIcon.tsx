import React from "react";
import IconProps from "./IconProps";

export default function PbxIcon({
    size = 24,
    color = "black"
}: IconProps) {
    return (
        <svg width={size} height={size} fill={color} viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <title>Telavox/Ivr 24px</title>
            <g id="Telavox/Ivr-24px" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="-g-Group">
                    <rect id="Rectangle-3" x="0" y="0" width="24" height="24"></rect>
                    <path d="M13,13 L13,16.1707057 C14.1651924,16.5825421 15,17.6937812 15,19 C15,20.6568542 13.6568542,22 12,22 C10.3431458,22 9,20.6568542 9,19 C9,17.6937812 9.83480763,16.5825421 11,16.1707057 L11,13 L6,13 L6,16.1707057 C7.16519237,16.5825421 8,17.6937812 8,19 C8,20.6568542 6.65685425,22 5,22 C3.34314575,22 2,20.6568542 2,19 C2,17.6937812 2.83480763,16.5825421 4,16.1707057 L4,11 L11,11 L11,7.82929429 C9.83480763,7.41745788 9,6.30621883 9,5 C9,3.34314575 10.3431458,2 12,2 C13.6568542,2 15,3.34314575 15,5 C15,6.30621883 14.1651924,7.41745788 13,7.82929429 L13,11 L20,11 L20,16.1707057 C21.1651924,16.5825421 22,17.6937812 22,19 C22,20.6568542 20.6568542,22 19,22 C17.3431458,22 16,20.6568542 16,19 C16,17.6937812 16.8348076,16.5825421 18,16.1707057 L18,13 L13,13 Z" id="Combined-Shape" fill={color}></path>
                </g>
            </g>
        </svg>
    )
}
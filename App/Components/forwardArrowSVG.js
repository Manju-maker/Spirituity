
import React from 'react';
import Svg, { G, Rect, Path, Polyline } from "react-native-svg";

const ForwardArrowSVG = () => {
    return (
        <Svg width="18px" height="18px" viewBox="0 0 18 18" version="1.1">
            <G id="Icon-/-18px-/-Arrow-/-White" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <G id="arrow">
                    <Rect id="Rectangle" fill="#FFFFFF" opacity="0" x="0" y="0" width="18" height="18"></Rect>
                    <Path d="M16.5,9 L0.5,9" id="Path" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></Path>
                    <Polyline id="Path" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points="12.5 13 16.5 9 12.5 5"></Polyline>
                </G>
            </G>
        </Svg>
    )
}

export default ForwardArrowSVG;

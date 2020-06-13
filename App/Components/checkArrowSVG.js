import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function CheckArrowSVG(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <G fill="none" fillRule="evenodd">
        <Path d="M0 0h24v24H0z" />
        <Path
          fill="#2E7BE4"
          d="M16.782 7.294a.832.832 0 111.27 1.079l-7.084 8.333a.832.832 0 01-1.188.084l-3.75-3.334a.834.834 0 011.107-1.246l3.113 2.768 6.532-7.684z"
        />
      </G>
    </Svg>
  );
}

export default CheckArrowSVG;

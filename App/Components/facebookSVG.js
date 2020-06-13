import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function FacebookSVG(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <G fill="none" fillRule="evenodd">
        <Path d="M0 0h24v24H0z" />
        <Path
          fill="#1F5DC4"
          d="M12.99 19v-7h1.775L15 9.586h-2.01l.003-1.208c0-.63.055-.966.885-.966h1.11V5h-1.776C11.08 5 10.33 6.17 10.33 8.138v1.449H9v2.412h1.33V19h2.66z"
        />
      </G>
    </Svg>
  );
}

export default FacebookSVG;

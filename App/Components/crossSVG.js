import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function CrossSVG(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <G fill="none" fillRule="evenodd">
        <Path d="M0 0h24v24H0z" />
        <Path
          fill="#FFF"
          d="M13.174 12l3.58-3.573a.837.837 0 00-1.182-1.182L12 10.825l-3.572-3.58a.835.835 0 10-1.182 1.182L10.826 12l-3.58 3.572a.832.832 0 000 1.182.834.834 0 001.182.001L12 13.174l3.572 3.58a.833.833 0 001.182 0 .837.837 0 000-1.183L13.174 12z"
        />
      </G>
    </Svg>
  );
}

export default CrossSVG;

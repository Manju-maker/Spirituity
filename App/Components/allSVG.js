import * as React from 'react';
import Svg, {
  Defs,
  ClipPath,
  G,
  Path,
  Circle,
  Mask,
  Use,
  Rect,
  Polyline,
  LinearGradient,
  Stop,
} from 'react-native-svg';

export function BarzWhiteSVG(props) {
  return (
    <Svg width={86} height={32} viewBox="0 0 86 32" {...props}>
      <Defs />
      <G fill="#FFF" fillRule="evenodd" filter="url(#prefix__a)">
        <Path d="M7.157 26.122h2.776c2.212 0 4.164-1.331 4.164-5.671 0-4.554-1.475-5.413-3.123-5.413-2.299 0-3.817 1.933-3.817 1.933v9.151zM7.114.044v11.342S9.673 9.11 12.926 9.11c4.771 0 8.588 2.75 8.588 11.17 0 8.378-5.639 11.729-11.624 11.729H3.21C1.17 32.008 0 30.934 0 29.087V.044h7.114zm25.004 26.873h3.499v-3.123s-1.383-1.155-4.19-1.155c-1.512 0-2.55.727-2.55 2.054 0 1.369.908 2.224 3.241 2.224m-1.901-8.94c3.499 0 5.4 1.111 5.4 1.111v-1.24c0-1.968-1.296-2.824-3.629-2.824-4.58 0-7.474 1.84-7.474 1.84l-1.9-5.433s4.104-2.396 10.022-2.396c6.308 0 9.677 2.524 9.677 8.3v11.764c0 1.84-1.123 2.909-3.154 2.909h-7.603c-6.48 0-9.547-2.695-9.547-7.23 0-4.45 3.456-6.802 8.208-6.802m42.618 8.613h13.138v5.419h-19.25c-2.212 0-3.296-1.228-3.296-3.175 0-.974.434-2.032 1.17-2.879l9.582-10.796H61.165V9.782h18.997c2.211 0 3.252 1.228 3.252 3.175 0 1.058-.477 2.159-1.17 2.964l-9.409 10.668z" />
        <Circle cx={58.68} cy={19.8} r={1.08} />
        <Circle cx={56.88} cy={17.28} r={1} />
        <Path d="M60.444 9.677H45.68c-2.182 0-3.252 1.233-3.252 3.19 0 .978.428 2.041 1.155 2.892l9.457 10.847 4.698 5.402h1.207c2.182 0 3.209-1.234 3.209-3.19 0-1.064-.47-2.17-1.155-2.978l-9.286-10.719h8.73V9.677z" />
      </G>
    </Svg>
  );
}

export function CheckArrowSVG(props) {
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

export function CircleSVG(props) {
  return (
    <Svg width="160pt" height="137pt" viewBox="0 0 160 137" {...props}>
      <Defs>
        <ClipPath id="prefix__g">
          <Path d="M65 22h13v12H65zm0 0" />
        </ClipPath>
        <ClipPath id="prefix__h">
          <Path d="M76.266 31.04a5.714 5.714 0 01-7.868 1.815 5.714 5.714 0 01-1.816-7.867 5.708 5.708 0 017.867-1.816 5.707 5.707 0 011.817 7.867" />
        </ClipPath>
        <ClipPath id="prefix__i">
          <Path d="M38 5h13v12H38zm0 0" />
        </ClipPath>
        <ClipPath id="prefix__j">
          <Path d="M49.5 14.313a5.714 5.714 0 01-7.867 1.816 5.708 5.708 0 01-1.817-7.867 5.707 5.707 0 017.868-1.817 5.714 5.714 0 011.816 7.867" />
        </ClipPath>
        <ClipPath id="prefix__k">
          <Path d="M76 63h11v13H76zm0 0" />
        </ClipPath>
        <ClipPath id="prefix__l">
          <Path d="M87.45 72.703a5.707 5.707 0 01-7.868 1.817 5.713 5.713 0 01-1.816-7.868 5.71 5.71 0 017.867-1.812 5.706 5.706 0 011.816 7.863" />
        </ClipPath>
        <ClipPath id="prefix__m">
          <Path d="M50 47h12v12H50zm0 0" />
        </ClipPath>
        <ClipPath id="prefix__n">
          <Path d="M60.68 55.977a5.702 5.702 0 01-7.864 1.816A5.706 5.706 0 0151 49.926a5.705 5.705 0 017.863-1.813 5.703 5.703 0 011.817 7.864" />
        </ClipPath>
        <ClipPath id="prefix__o">
          <Path d="M16 27h25v25H16zm0 0" />
        </ClipPath>
        <ClipPath id="prefix__p">
          <Path d="M38.879 45.715c-3.516 5.62-10.918 7.332-16.54 3.82-5.62-3.512-7.327-10.914-3.816-16.539 3.516-5.621 10.915-7.324 16.536-3.812 5.62 3.511 7.332 10.91 3.82 16.53" />
        </ClipPath>
        <ClipPath id="prefix__b">
          <Path d="M22.879 18.715c-3.516 5.62-10.918 7.332-16.54 3.82C.72 19.023-.987 11.621 2.524 5.996 6.04.375 13.438-1.328 19.06 2.184c5.62 3.511 7.332 10.91 3.82 16.53" />
        </ClipPath>
        <ClipPath id="prefix__c">
          <Path d="M0 2h25v23H0zm0 0" />
        </ClipPath>
        <ClipPath id="prefix__d">
          <Path d="M22.879 18.715c-3.516 5.62-10.918 7.332-16.54 3.82C.72 19.023-.987 11.621 2.524 5.996 6.04.375 13.438-1.328 19.06 2.184c5.62 3.511 7.332 10.91 3.82 16.53" />
        </ClipPath>
        <ClipPath id="prefix__e">
          <Path d="M0 5h25v20H0zm0 0" />
        </ClipPath>
        <ClipPath id="prefix__f">
          <Path d="M22.879 18.715c-3.516 5.62-10.918 7.332-16.54 3.82C.72 19.023-.987 11.621 2.524 5.996 6.04.375 13.438-1.328 19.06 2.184c5.62 3.511 7.332 10.91 3.82 16.53" />
        </ClipPath>
        <ClipPath id="prefix__a">
          <Path d="M0 0h25v25H0z" />
        </ClipPath>
        <ClipPath id="prefix__r">
          <Path d="M61 88h12v13H61zm0 0" />
        </ClipPath>
        <ClipPath id="prefix__s">
          <Path d="M71.863 97.648a5.714 5.714 0 01-7.867 1.817 5.714 5.714 0 01-1.816-7.867 5.71 5.71 0 019.684 6.05" />
        </ClipPath>
        <G id="prefix__q" clipPath="url(#prefix__a)">
          <G
            clipPath="url(#prefix__b)"
            clipRule="evenodd"
            fill="none"
            strokeLinecap="square"
            stroke="#de4161"
            strokeMiterlimit={10}>
            <Path
              d="M.389 16.136L25.83.238"
              transform="translate(-6.713 -4.05)"
            />
            <Path
              d="M.388 16.134L25.83.236"
              transform="translate(-4.466 -.455)"
            />
            <Path
              d="M.39 16.133L25.83.238"
              transform="translate(-2.347 2.938)"
            />
            <Path
              d="M.387 16.135L25.83.237"
              transform="translate(-.227 6.33)"
            />
            <Path
              d="M.388 16.133L25.83.238"
              transform="translate(1.971 9.848)"
            />
            <Path
              d="M.387 16.135L25.83.236"
              transform="translate(4.218 13.443)"
            />
          </G>
          <G clipPath="url(#prefix__c)">
            <G clipPath="url(#prefix__d)" clipRule="evenodd">
              <Path
                d="M.388 16.134L25.828.235"
                transform="translate(5.808 15.988)"
                fill="none"
                strokeLinecap="square"
                stroke="#de4161"
                strokeMiterlimit={10}
              />
            </G>
          </G>
          <G clipPath="url(#prefix__e)">
            <G clipPath="url(#prefix__f)" clipRule="evenodd">
              <Path
                d="M.389 16.136L25.83.237"
                transform="translate(7.927 19.38)"
                fill="none"
                strokeLinecap="square"
                stroke="#de4161"
                strokeMiterlimit={10}
              />
            </G>
          </G>
        </G>
      </Defs>
      <G clipPath="url(#prefix__g)">
        <G clipPath="url(#prefix__h)" clipRule="evenodd">
          <Path
            d="M68.02 13.258l18.16 11.347L74.832 42.77 56.668 31.418zm0 0"
            fill="#de4161"
          />
        </G>
      </G>
      <G clipPath="url(#prefix__i)">
        <G clipPath="url(#prefix__j)" clipRule="evenodd">
          <Path
            d="M41.25-3.469L59.414 7.88 48.062 26.043l-18.16-11.352zm0 0"
            fill="#de4161"
          />
        </G>
      </G>
      <G clipPath="url(#prefix__k)">
        <G clipPath="url(#prefix__l)" clipRule="evenodd">
          <Path
            d="M79.2 54.926l18.163 11.347-11.347 18.165-18.164-11.352zm0 0"
            fill="#de4161"
          />
        </G>
      </G>
      <G clipPath="url(#prefix__m)">
        <G clipPath="url(#prefix__n)" clipRule="evenodd">
          <Path
            d="M52.434 38.2l18.16 11.347L59.246 67.71 41.082 56.359zm0 0"
            fill="#de4161"
          />
        </G>
      </G>
      <G clipPath="url(#prefix__o)">
        <G clipPath="url(#prefix__p)" clipRule="evenodd">
          <Use xlinkHref="#prefix__q" transform="translate(16 27)" />
        </G>
      </G>
      <G clipPath="url(#prefix__r)">
        <G clipPath="url(#prefix__s)" clipRule="evenodd">
          <Path
            d="M63.617 79.867l18.16 11.348-11.347 18.164-18.164-11.352zm0 0"
            fill="#de4161"
          />
        </G>
      </G>
    </Svg>
  );
}

export function CrossSVG(props) {
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

export function FacebookSVG(props) {
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

export const ForwardArrowSVG = () => {
  return (
    <Svg width="18px" height="18px" viewBox="0 0 18 18" version="1.1">
      <G
        id="Icon-/-18px-/-Arrow-/-White"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd">
        <G id="arrow">
          <Rect
            id="Rectangle"
            fill="#FFFFFF"
            opacity="0"
            x="0"
            y="0"
            width="18"
            height="18"
          />
          <Path
            d="M16.5,9 L0.5,9"
            id="Path"
            stroke="#FFFFFF"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <Polyline
            id="Path"
            stroke="#FFFFFF"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            points="12.5 13 16.5 9 12.5 5"
          />
        </G>
      </G>
    </Svg>
  );
};

export function GoogleSVG(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <G fill="none">
        <Path
          fill="#FFF"
          d="M0 12C0 5.373 5.373 0 12 0s12 5.373 12 12-5.373 12-12 12S0 18.627 0 12z"
        />
        <Path
          fill="#EA4335"
          d="M11.933 7.68c1.302 0 2.18.563 2.681 1.033l1.957-1.91C15.369 5.686 13.805 5 11.933 5A6.928 6.928 0 005.74 8.821l2.241 1.741c.563-1.672 2.119-2.881 3.952-2.881z"
        />
        <Path
          fill="#4285F4"
          d="M18.59 12.087c0-.57-.047-.986-.147-1.417h-6.51v2.573h3.821c-.077.64-.493 1.602-1.417 2.25l2.188 1.694c1.31-1.21 2.064-2.989 2.064-5.1z"
        />
        <Path
          fill="#FBBC05"
          d="M7.99 13.305a4.257 4.257 0 01-.232-1.372c0-.477.085-.94.223-1.37L5.74 8.82c-.47.94-.74 1.995-.74 3.112s.27 2.173.74 3.113l2.25-1.741z"
        />
        <Path
          fill="#34A853"
          d="M11.933 18.867c1.872 0 3.444-.617 4.592-1.68l-2.188-1.695c-.586.409-1.371.694-2.404.694-1.833 0-3.39-1.21-3.944-2.881l-2.242 1.74a6.916 6.916 0 006.186 3.822z"
        />
      </G>
    </Svg>
  );
}

export const HidePasswordSVG = () => {
  return (
    <Svg width="24px" height="20px" viewBox="0 0 24 20" version="1.1">
      <G
        id="Main-App-Barz"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
        stroke-linecap="round"
        stroke-linejoin="round">
        <G
          id="Sign-Up"
          transform="translate(-317.000000, -502.000000)"
          stroke="#717171"
          stroke-width="1.5">
          <G id="Sign-up" transform="translate(20.000000, 174.000000)">
            <G id="Field-Copy" transform="translate(0.000000, 284.000000)">
              <G id="view-off" transform="translate(297.000000, 45.000000)">
                <Path d="M2.78,18 L21.53,0" id="Path" />
                <Path
                  d="M8.964,16.051 L8.96400072,16.0510002 C9.94681472,16.3562272 10.9709107,16.5076822 12.0000007,16.5000002 C16.1000007,16.5690002 20.2580007,13.6870002 22.8240007,10.8630002 L22.8240007,10.8630002 C23.3938177,10.2303972 23.3938177,9.26960022 22.8240007,8.63700022 L22.8240022,8.63700181 C21.8944142,7.61721181 20.8645622,6.69356181 19.7500122,5.88000181"
                  id="Path"
                />
                <Path
                  d="M14.413,3.282 L14.4130005,3.28200013 C13.6239545,3.08564813 12.8130605,2.99088213 12.0000005,3.00000013 C7.96900052,2.93300013 3.80000052,5.75200013 1.17900052,8.63500013 L1.17900049,8.63500017 C0.60918349,9.26760317 0.60918349,10.2284002 1.17900056,10.8610002 L1.17899951,10.860999 C1.97592251,11.733395 2.84572951,12.536299 3.77898951,13.260999"
                  id="Path"
                />
                <Path
                  d="M8.24999987,9.75 L8.24999987,9.74900043 C8.24999955,7.67848043 9.92847987,6.00000043 11.9989999,6.00000043 C11.9996666,6.00000043 12.0003334,6.00000061 12.0010001,6.00000043"
                  id="Path"
                />
                <Path
                  d="M15.7500001,9.749 L15.7500001,9.749 L15.7500001,9.75 C15.7500001,11.82107 14.0710701,13.5 12.0000001,13.5 C11.9996668,13.5 11.9993334,13.5 11.999,13.5"
                  id="Path"
                />
              </G>
            </G>
          </G>
        </G>
      </G>
    </Svg>
  );
};

export function WavesSVG(props) {
  return (
    <Svg width={112} height="83pt" viewBox="0 0 84 83" {...props}>
      <Defs>
        <ClipPath id="prefix__a">
          <Path d="M43 0h41v83H43zm0 0" />
        </ClipPath>
      </Defs>
      <G
        clipPath="url(#prefix__a)"
        fill="none"
        strokeWidth={6.4}
        stroke="#6727b4"
        strokeMiterlimit={10}>
        <Path d="M4 72.656c0-7.511 6.137-13.562 13.621-13.437l.5.008c7.45.125 13.57-5.872 13.621-13.344l.012-1.348c.05-7.437 6.11-13.418 13.523-13.347l.727.007c7.512.07 13.613-6.062 13.527-13.597C59.438 9.91 65.79 3.71 73.45 4.012M13.438 82.121c0-7.508 6.136-13.562 13.62-13.437l.5.007c7.45.125 13.57-5.87 13.622-13.343L41.19 54c.051-7.434 6.11-13.414 13.524-13.344l.726.004c7.512.074 13.614-6.062 13.524-13.597-.09-7.688 6.258-13.887 13.922-13.586" />
      </G>
    </Svg>
  );
}

export function SquareSVG(props) {
  return (
    <Svg width={49} height={80} viewBox="0 0 49 80" {...props}>
      <Defs>
        <ClipPath id="prefix__a">
          <Path d="M0 0h36v80H0zm0 0" />
        </ClipPath>
      </Defs>
      <G
        clipPath="url(#prefix__a)"
        fill="none"
        strokeWidth={5.76}
        strokeMiterlimit={10}>
        <Path
          d="M30.691 67.46l-18.28 8.493L4 57.493 22.281 49zm0 0"
          stroke="#d89dff"
        />
        <Path d="M24 3l21.168 13.348-10.547 20.32" stroke="#f48a6b" />
      </G>
    </Svg>
  );
}

export function StrawSvg(props) {
  return (
    <Svg width={64} height={64} viewBox="0 0 64 48" {...props}>
      <Defs>
        <ClipPath id="prefix__a">
          <Path d="M11 14h24v34H11zm0 0" />
        </ClipPath>
        <ClipPath id="prefix__b">
          <Path d="M1.43 24.887l10.574 22.988 22.992-10.578-10.578-22.988zm0 0" />
        </ClipPath>
        <ClipPath id="prefix__c">
          <Path d="M11 0h53v48H11zm0 0" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#prefix__a)">
        <G clipPath="url(#prefix__b)" clipRule="evenodd">
          <Path d="M-3.57 9.309h43.566v43.566H-3.57zm0 0" fill="#f5d164" />
        </G>
      </G>
      <G clipPath="url(#prefix__c)">
        <Path
          d="M1.906 1.617l24.18 28.492 27.602-14.246 7.726 14.246"
          fill="none"
          strokeWidth={5}
          stroke="#fceee2"
          strokeMiterlimit={10}
        />
      </G>
    </Svg>
  );
}

export function SearchSVG(props) {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" {...props}>
      <Path
        d="M12.806 13l3.325 3.625M12.285 3.529c2.5 2.538 2.5 6.654 0 9.192a6.334 6.334 0 01-9.055 0c-2.5-2.538-2.5-6.654 0-9.192a6.334 6.334 0 019.055 0"
        fill="none"
        fillRule="evenodd"
        stroke="#FFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </Svg>
  );
}

export function NotificationSVG(props) {
  return (
    <Svg width={16} height={17} viewBox="0 0 16 17" {...props}>
      <Path
        d="M7.436.6C4.823.6 2.707 2.749 2.707 5.4c0 5.6-2.364 7.2-2.364 7.2h14.185s-2.364-1.6-2.364-7.2c0-2.651-2.117-4.8-4.728-4.8zm1.363 15.2a1.573 1.573 0 01-1.363.797 1.574 1.574 0 01-1.364-.797"
        fill="none"
        fillRule="evenodd"
        stroke="#FFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </Svg>
  );
}

export function BarzWalletSVG(props) {
  return (
    <Svg width={56} height={55} viewBox="0 0 56 55" {...props}>
      <Defs>
        <LinearGradient
          id="prefix__b"
          x1="100%"
          x2="15.805%"
          y1="11.719%"
          y2="100%">
          <Stop offset="0%" stopColor="#FB8F66" />
          <Stop offset="100%" stopColor="#7033FF" />
        </LinearGradient>
        <LinearGradient
          id="prefix__c"
          x1="50%"
          x2="100%"
          y1="100%"
          y2="27.515%">
          <Stop offset="0%" stopColor="#A355C7" />
          <Stop offset="100%" stopColor="#FFA36E" />
        </LinearGradient>
        <Circle id="prefix__a" cx={24.923} cy={24.923} r={24.923} />
      </Defs>
      <G fill="none" fillRule="evenodd" transform="translate(3.5 3)">
        <Mask id="prefix__e" fill="#fff">
          <Use xlinkHref="#prefix__a" />
        </Mask>
        <Use
          fill="url(#prefix__b)"
          stroke="url(#prefix__c)"
          strokeWidth={4.154}
          xlinkHref="#prefix__a"
        />
        <G filter="url(#prefix__d)" mask="url(#prefix__e)">
          <G fill="#FFF">
            <G filter="url(#prefix__f)" transform="translate(24.892 18.692)">
              <Path d="M2.239 7.856h.868c.692 0 1.302-.4 1.302-1.705 0-1.37-.46-1.628-.977-1.628-.719 0-1.193.581-1.193.581v2.752zM2.225.013v3.411s.8-.684 1.818-.684c1.492 0 2.686.827 2.686 3.359 0 2.52-1.763 3.528-3.636 3.528H1.004C.366 9.627 0 9.304 0 8.748V.013h2.225zm7.821 8.082h1.094v-.939s-.432-.347-1.31-.347c-.473 0-.798.219-.798.617 0 .412.284.67 1.014.67m-.595-2.69c1.095 0 1.69.335 1.69.335v-.373c0-.592-.406-.85-1.136-.85-1.432 0-2.337.554-2.337.554l-.595-1.634s1.284-.72 3.135-.72c1.973 0 3.027.759 3.027 2.495v3.539c0 .553-.351.875-.987.875H9.87c-2.027 0-2.986-.811-2.986-2.175 0-1.338 1.081-2.046 2.567-2.046m9.455-2.496h-4.618c-.682 0-1.017.371-1.017.96 0 .294.134.614.362.87l2.957 3.262 1.47 1.625h.377c.683 0 1.004-.371 1.004-.96 0-.32-.147-.652-.361-.895l-2.905-3.224h2.73V2.91z" />
            </G>
            <Path
              fillRule="nonzero"
              d="M8.279 28.258v-3.801c0-.73.432-1.032 1.1-1.032h.406v4.833h2.107v-4.833h.393c.668 0 1.1.302 1.1 1.032v3.801h2.16V24.47c0-2.077-1.14-2.82-3.26-2.82h-2.84c-1.039 0-1.869.185-2.44.628-.573.444-.886 1.15-.886 2.192v3.788h2.16zm9.211 2.367c1.466 0 2.356-.516 2.736-1.775l2.16-7.2h-2.16l-.93 3.978-1.112-3.978h-2.292l2.252 6.457-.17.466c-.092.302-.341.416-.668.416h-.367v1.636h.55z"
            />
          </G>
        </G>
      </G>
    </Svg>
  );
}
export function VodkaSVG(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <G fill="none" fillRule="evenodd">
        <Path
          fill="#FFF"
          fillRule="nonzero"
          d="M14 6.91V2.406c0-.223-.224-.406-.5-.406h-3c-.276 0-.5.183-.5.407V6.91c-1.661.03-3 1.106-3 2.424v14.26c0 .224.224.407.5.407h9c.276 0 .5-.183.5-.407V9.333c0-1.325-1.354-2.406-3-2.424zM16 23H8v-4h8v4zm0-5H8v-4h8v4zm0-4H8V9.77c0-.923.929-1.673 2.099-1.674l.429-.02c.265-.013.472-.198.472-.422V3h2v4.654c0 .224.207.41.472.422l.457.021c1.142 0 2.071.75 2.071 1.673V14z"
        />
        <Path stroke="#FFF" strokeLinecap="square" d="M10.5.5h3" />
      </G>
    </Svg>
  );
}

export function BrandySVG(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <Path
        d="M2.84 9.5h18.32m-16.71 11h15.1M14 3.5v1.617h0c0 .653.369 1.25.953 1.543l5.126 2h0a3.44 3.44 0 011.915 3.254h0a20.852 20.852 0 01-3.743 10.792h0a1.732 1.732 0 01-1.453.8H7.2h0a1.732 1.732 0 01-1.453-.8h0a20.856 20.856 0 01-3.741-10.793h0a3.439 3.439 0 011.915-3.254l5.126-2h0c.584-.292.953-.889.953-1.542V3.5M15.811.915h0A1.002 1.002 0 0015 .5H9h0a1 1 0 00-.949 1.316l.334 1h0a1 1 0 00.948.684h5.334a1 1 0 00.948-.684l.334-1h0a1 1 0 00-.138-.901h0z"
        fill="none"
        fillRule="evenodd"
        stroke="#FFF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function WhiskeySVG(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <G
        fill="none"
        fillRule="evenodd"
        stroke="#FFF"
        strokeLinecap="round"
        strokeLinejoin="round">
        <Path d="M10 23.5H2.723h0a1.5 1.5 0 01-1.478-1.24h0A57.365 57.365 0 01.5 14.5c0-3 5-3.5 5-5.5V3.5m3 0V9c0 .83.861 1.4 1.869 2M8.5 3.5h-3V1h0A.5.5 0 016 .5h2a.5.5 0 01.5.5v2.5z" />
        <Path d="M4 20.5a.5.5 0 01-.5-.5v-4a.5.5 0 01.5-.5h6a.5.5 0 01.5.5v4a.5.5 0 01-.5.5H4zm19-8h0a.5.5 0 01.5.5v8.847c0 .909-1.209 1.653-2.129 1.653H14.68c-.921 0-2.18-.744-2.18-1.653V13h0a.5.5 0 01.5-.5h10zm-10.49 4H23.5" />
        <Path d="M15.25 18.5h0a.25.25 0 10.25.25h0a.25.25 0 00-.25-.25m5.5 0h0a.25.25 0 10.25.25h0a.25.25 0 00-.25-.25M18 21h0a.25.25 0 10.25.25h0A.25.25 0 0018 21" />
      </G>
    </Svg>
  );
}

export function RumSVG(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <Path
        d="M13 13.5v2.389h0a3.072 3.072 0 002.406 3.054h0A3 3 0 0019 16v-2.5h0a.5.5 0 00-.5-.5h-5 0a.5.5 0 00-.5.5s0 0 0 0h0zm3 5.5v4.5m-2.5 0h5M13 10.862h0a.999.999 0 00-.232-.64l-2.036-2.444h0a.999.999 0 01-.232-.64V1.5h0a1 1 0 00-1-1h-1 0a1 1 0 00-1 1s0 0 0 0v5.638h0c0 .234-.082.46-.232.64l-2.036 2.444h0a.999.999 0 00-.232.64V22.5h0a1 1 0 001 1h5.5m-4-20h3"
        fill="none"
        fillRule="evenodd"
        stroke="#FFF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function GinSVG(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <Path
        d="M13.998 7.025V3.5a.5.5 0 00-.5-.5h-3a.5.5 0 00-.5.5v3.525c-1.661.037-3 1.357-3 2.975v13.5a.5.5 0 00.5.5h9a.5.5 0 00.5-.5V10c0-1.627-1.354-2.953-3-2.975zm2 15.975h-8v-5h8v5zm0-6h-8v-6h8v6zm-8-5.014V10c0-1.09.929-1.976 2.099-1.977l.429-.024a.5.5 0 00.472-.499V4h2v3.5a.5.5 0 00.472.499l.457.025c1.142 0 2.071.886 2.071 1.976v1.986h-8zM10.498 0h3a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5z"
        fill="#FFF"
      />
    </Svg>
  );
}

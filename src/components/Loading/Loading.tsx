const Loading = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{
        margin: 'auto', 
        display: 'block',
      }}
      width="200px"
      height="200px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <defs>
        <filter
          id="ldio-nqc7a1eunfn-filter"
          x="-100%"
          y="-100%"
          width="300%"
          height="300%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.4000000000000004" />
          <feComponentTransfer result="cutoff">
            <feFuncA type="table" tableValues="0 0 0 0 0 0 1 1 1 1 1" />
          </feComponentTransfer>
        </filter>
      </defs>
      <g filter="url(#ldio-nqc7a1eunfn-filter)">
        {[0, 1, 2, 3, 4].map((index) => (
          <g key={index} transform={`translate(50 50)`}>
            <g>
              <circle cx="17" cy="0" r="5" fill={index % 2 === 0 ? '#de0d48' : '#980c33'}>
                <animate
                  attributeName="r"
                  keyTimes="0;0.5;1"
                  values="3.5999999999999996;8.399999999999999;3.5999999999999996"
                  dur={`${4 / (index + 1)}s`}
                  repeatCount="indefinite"
                  begin={`-${0.25 + index * 0.05}s`}
                />
              </circle>
              <animateTransform
                attributeName="transform"
                type="rotate"
                keyTimes="0;1"
                values="0;360"
                dur={`${4 / (index + 1)}s`}
                repeatCount="indefinite"
                begin={`${index * 0.05}s`}
              />
            </g>
          </g>
        ))}
      </g>
    </svg>
  );
};

export default Loading;

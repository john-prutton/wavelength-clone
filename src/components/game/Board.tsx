export function Board() {
  return (
    <section className="w-full flex items-center">
      <svg className="w-full aspect-video max-h-svh" viewBox="0 0 100 50">
        <defs>
          <mask
            id="semi-circle-mask"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="100"
            height="50"
          >
            <path
              d="M100 50H0C0 50 0 0 51.6854 0C100 0 100 50 100 50Z"
              fill="white"
            />
          </mask>
        </defs>

        <g mask="url(#semi-circle-mask)">
          <rect className="fill-white" x1={0} y1={0} width={100} height={50} />
          <g className="origin-bottom rotate-45 scale-150">
            <path
              className="fill-amber-300"
              d="M25 0L50 50L75 0H65L50 50L35 0H25Z"
            />
            <path className="fill-orange-400" d="M35 0L50 50L45 0H35Z" />
            <path className="fill-orange-400" d="M50 50L65 0H55L50 50Z" />

            <path className="fill-blue-500" d="M45 0L50 50L55 0H45Z" />
          </g>
        </g>

        <g className="fill-red-500 stroke-red-500 origin-bottom rotate-45">
          <circle fill="inherit" cx={50} cy={50} r={2.5} />
          <line
            x1={50}
            y1={50}
            x2={50}
            y2={-10}
            className="stroke-1"
            stroke="inherit"
          />
        </g>
      </svg>
    </section>
  )
}

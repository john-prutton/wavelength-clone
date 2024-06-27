import { useGameStore } from "@/lib/stores/game-store"
import { useState } from "react"

export function Board() {
  const { card } = useGameStore()
  const [pinRotation, setPinRotation] = useState(0)

  const handleClick = ({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const { left, top, width, height } = currentTarget.getBoundingClientRect()

    const x = left + width / 2
    const y = top + height

    const angle = Math.atan2(x - clientX, y - clientY) * (180 / Math.PI)
    setPinRotation(angle)
  }
  return (
    <section className="relative w-full flex items-center">
      {card && (
        <>
          <span className="absolute left-0 bottom-0 text-green-400">
            {card.left}
          </span>
          <span className="absolute right-0 bottom-0 text-green-400">
            {card.right}
          </span>
        </>
      )}
      <svg
        className="w-full max-h-svh"
        viewBox="0 0 100 50"
        onMouseUp={handleClick}
      >
        <defs>
          <mask id="semi-circle-mask">
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

        <g
          className="fill-red-500 stroke-red-500 origin-bottom"
          style={{ rotate: `${-pinRotation}deg` }}
        >
          <line
            x1={50}
            y1={50}
            x2={50}
            y2={-10}
            className="stroke-1"
            stroke="inherit"
          />
          <circle fill="inherit" cx={50} cy={50} r={1} />
        </g>
      </svg>
    </section>
  )
}

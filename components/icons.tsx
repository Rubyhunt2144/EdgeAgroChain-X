import type React from "react"

type IconProps = React.SVGProps<SVGSVGElement> & { size?: number | string }

function makeIcon(path: React.ReactNode) {
  return function Icon({ size = 24, ...props }: IconProps) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        {...props}
      >
        {path}
      </svg>
    )
  }
}

export const Brain = makeIcon(
  <>
    <path d="M8 6a3 3 0 0 0-3 3v1a3 3 0 0 0 3 3" />
    <path d="M8 18a3 3 0 0 1-3-3v-1" />
    <path d="M16 6a3 3 0 0 1 3 3v1a3 3 0 0 1-3 3" />
    <path d="M16 18a3 3 0 0 0 3-3v-1" />
    <path d="M8 6V4a2 2 0 0 1 2-2h1" />
    <path d="M16 6V4a2 2 0 0 0-2-2h-1" />
    <path d="M8 18v2a2 2 0 0 0 2 2h1" />
    <path d="M16 18v2a2 2 0 0 1-2 2h-1" />
  </>,
)

export const AlertTriangle = makeIcon(
  <>
    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" x2="12" y1="9" y2="13" />
    <line x1="12" x2="12.01" y1="17" y2="17" />
  </>,
)

export const CheckCircle = makeIcon(
  <>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </>,
)

export const Info = makeIcon(
  <>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" x2="12" y1="16" y2="12" />
    <line x1="12" x2="12.01" y1="8" y2="8" />
  </>,
)

export const TrendingUp = makeIcon(
  <>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </>,
)

export const Droplets = makeIcon(
  <>
    <path d="M12 2 C8 7,4 9,4 13 a8 8 0 0 0 16 0 c0-4-4-6-8-11z" />
  </>,
)

export const Thermometer = makeIcon(
  <>
    <path d="M12 2a4 4 0 0 0-4 4v7a5 5 0 1 0 8 0V6a4 4 0 0 0-4-4z" />
  </>,
)

export const Wind = makeIcon(
  <>
    <path d="M3 12h15a3 3 0 1 0-3-3" />
    <path d="M4 18h10a2 2 0 1 0-2-2" />
  </>,
)

export const Sun = makeIcon(
  <>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l-1.5-1.5M19.5 19.5L18 18M5 19l-1.5 1.5M19.5 4.5L18 6" />
  </>,
)

export const Cloud = makeIcon(
  <>
    <path d="M17.5 19a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.5 2A4 4 0 0 0 6 19z" />
  </>,
)

export const Waves = makeIcon(
  <>
    <path d="M2 8s2 2 5 2 5-2 5-2 2-2 5-2 5 2 5 2" />
    <path d="M2 16s2 2 5 2 5-2 5-2 2-2 5-2 5 2 5 2" />
  </>,
)

export const Bell = makeIcon(
  <>
    <path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10 22a2 2 0 0 0 4 0" />
  </>,
)

export const Wifi = makeIcon(
  <>
    <path d="M5 12.55a11 11 0 0 1 14.08 0" />
    <path d="M1.42 9a16 16 0 0 1 21.16 0" />
    <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
    <line x1="12" y1="20" x2="12" y2="20" />
  </>,
)

export const WifiOff = makeIcon(
  <>
    <line x1="1" y1="1" x2="23" y2="23" />
    <path d="M16.72 11.06A10.94 10.94 0 0 1 21 12.55" />
    <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.36L23 10" />
    <path d="M1.42 9a16 16 0 0 1 21.16 0" />
    <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
    <line x1="12" y1="14" x2="12" y2="14" />
  </>,
)

export const Download = makeIcon(
  <>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </>,
)

export const Activity = makeIcon(<polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />)
export const RefreshCw = makeIcon(
  <>
    <polyline points="23 4 23 10 17 10" />
    <polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0114.13-3.36L23 10" />
    <path d="M20.49 15a9 9 0 01-14.13 3.36L1 14" />
  </>,
)
export const BarChart3 = makeIcon(
  <>
    <line x1="3" y1="3" x2="3" y2="21" />
    <line x1="3" y1="19" x2="21" y2="19" />
    <rect x="7" y="12" width="3" height="7" />
    <rect x="12" y="8" width="3" height="11" />
    <rect x="17" y="5" width="3" height="14" />
  </>,
)
export const Gauge = makeIcon(<path d="M12 14l4-4M3 12a9 9 0 1118 0" />)
export const Zap = makeIcon(<polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />)
export const History = makeIcon(
  <>
    <polyline points="1 12 1 3 10 3" />
    <path d="M3.51 9A9 9 0 1021 12" />
    <polyline points="12 7 12 12 15 15" />
  </>,
)
export const Settings = makeIcon(
  <>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06A1.65 1.65 0 0015 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 2.83l.06-.06A1.65 1.65 0 008.6 15a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.6 8.6a1.65 1.65 0 00.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 008.6 4.6a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0l.06.06A1.65 1.65 0 0015.4 4.6a1.65 1.65 0 001.82.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 8.6a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 15z" />
  </>,
)

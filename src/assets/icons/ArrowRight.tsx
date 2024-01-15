import { SVGTypeProps } from "../../types/svg"

const SvgComponent = ({ size = 6, color = "#fff", ...props }: SVGTypeProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size * 1.67}
    fill="none"
    {...props}
  >
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m1 1 4 4-4 4"
    />
  </svg>
)

export default SvgComponent

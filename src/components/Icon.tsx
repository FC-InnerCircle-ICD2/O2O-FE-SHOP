import { icons } from "lucide-react"
import { HTMLAttributes } from "react"
export type IconName = keyof typeof icons // 아이콘 목록
export interface IconProps extends HTMLAttributes<HTMLOrSVGElement> {
  name: IconName
  color?: string
  size?: string | number
  strokeWidth?: string | number
  absoluteStrokeWidth?: boolean
  fill?: string
  onClick?: () => void
}
const Icon = ({
  name,
  size = "16px",
  color = "currentColor",
  strokeWidth = "1.75px",
  absoluteStrokeWidth = false,
  fill = "none",
  className,
  onClick,
}: IconProps) => {
  const LucideIcon = icons[name]
  if (!LucideIcon) {
    console.warn(`Lucide icon '${name}' does not exist.`)
    return null
  }
  return (
    <LucideIcon
      size={size}
      strokeWidth={strokeWidth}
      color={color}
      absoluteStrokeWidth={absoluteStrokeWidth}
      style={{ width: size, height: size }} // !important 없이 인라인 스타일 사용
      fill={fill}
      className={className}
      onClick={onClick}
    />
  )
}
export default Icon

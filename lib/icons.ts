import {
  Cloud,
  Container,
  GitBranch,
  Shield,
  Code,
  Brain,
  Database,
  Workflow,
  Award,
  Server,
  Cpu,
  Lock,
  Network,
  type LucideIcon,
} from "lucide-react"

export const ICON_MAP: Record<string, LucideIcon> = {
  Cloud,
  Container,
  GitBranch,
  Shield,
  Code,
  Brain,
  Database,
  Workflow,
  Award,
  Server,
  Cpu,
  Lock,
  Network,
}

export const ICON_NAMES = Object.keys(ICON_MAP) as Array<keyof typeof ICON_MAP>

export function getIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? Cloud
}

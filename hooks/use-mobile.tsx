"use client"
import { useMediaQuery } from "@uidotdev/usehooks"

export function useMobile() {
  const isMobile = useMediaQuery("only screen and (max-width : 768px)")
  return isMobile
}

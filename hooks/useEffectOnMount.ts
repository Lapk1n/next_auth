import { useEffect, useRef } from "react"

export const useEffectOnMount = (effect: () => any, dependency?: any) => {
  const initialized = useRef(false)

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      effect()
    }
  }, [dependency])
}
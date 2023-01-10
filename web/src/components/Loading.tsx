import { CircleNotch } from 'phosphor-react'

export function Loading() {
  return (
    <div className={style.wrapper}>
      <CircleNotch weight="bold" className={style.spinIcon} />
    </div>
  )
}

const style = {
  wrapper: `w-6 h-6 flex items-center justify-center overflow-hidden`,
  spinIcon: `w-4 h-4 animate-spin`,
}

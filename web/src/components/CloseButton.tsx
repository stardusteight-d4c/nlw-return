import { Popover } from '@headlessui/react'
import { X } from 'phosphor-react'

export function CloseButton() {
  return (
    <Popover.Button
      className={style.wrapper}
      title="Fechar Fomulário de Feedback"
    >
      <X weight="bold" className={style.closeIcon} />
    </Popover.Button>
  )
}

const style = {
  wrapper: `top-5 right-5 absolute text-zinc-400 hover:text-zinc-100`,
  closeIcon: `w-4 h-4`,
}

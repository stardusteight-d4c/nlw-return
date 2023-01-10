import { ChatTeardropDots } from 'phosphor-react'
import { Popover } from '@headlessui/react'
import { WidgetForm } from './WidgetForm'

export function Widget() {
  return (
    <Popover className={style.wrapper}>
      <Popover.Panel>
        <WidgetForm />
      </Popover.Panel>

      <Popover.Button className={style.buttonPopover}>
        <ChatTeardropDots className={style.chatIcon} />
        <span className={style.spanDivHoverEffect}>
          <span className="pl-2">Feedback</span>
        </span>
      </Popover.Button>
    </Popover>
  )
}

const style = {
  wrapper: `absolute bottom-4 right-4 md:bottom-8 md:right-8 flex flex-col items-end`,
  buttonPopover: `bg-brand-500 rounded-full px-3 h-12 text-white flex items-center group`,
  chatIcon: `w-6 h-6`,
  spanDivHoverEffect: `max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out`,
}

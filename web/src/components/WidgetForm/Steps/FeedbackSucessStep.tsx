import { CloseButton } from '../../CloseButton'
import { CheckIcon } from './integrate/CheckIcon'

interface FeedbackSucessStepProps {
  onFeedbackRestartRequested: () => void
}

export function FeedbackSucessStep({
  onFeedbackRestartRequested,
}: FeedbackSucessStepProps) {
  return (
    <>
      <header>
        <CloseButton />
      </header>

      <div className={style.feedbackStatusContainer}>
        <CheckIcon />
        <span className={style.thanksSpan}>Agradecemos o feedback!</span>
        <button
          type="button"
          onClick={onFeedbackRestartRequested}
          className={style.button}
        >
          Quero enviar outro
        </button>
      </div>
    </>
  )
}

const style = {
  feedbackStatusContainer: `flex flex-col items-center py-10 w-[304px]`,
  thanksSpan: `text-xl mt-2`,
  button: `py-2 px-6 mt-6 bg-zinc-800 rounded-md border-transparent text-sm leading-6 hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500`,
}

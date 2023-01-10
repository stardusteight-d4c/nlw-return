import { FeedbackType, feedbackTypes } from '..'
import { CloseButton } from '../../CloseButton'

interface FeedbackStepProps {
  onFeedbackTypeChanged: (type: FeedbackType) => void
}

export function FeedbackTypeStep({ onFeedbackTypeChanged }: FeedbackStepProps) {
  return (
    <>
      <header>
        <span className={style.headerTitle}>Deixe seu feedback</span>
        <CloseButton />
      </header>

      <div className={style.typesContentContainer}>
        {Object.entries(feedbackTypes).map(([key, value]) => {
          return (
            <button
              key={key}
              className={style.selectTypeButton}
              onClick={() => onFeedbackTypeChanged(key as FeedbackType)}
              type="button"
            >
              <img src={value.image.source} alt={value.image.alt} />
              <span>{value.title}</span>
            </button>
          )
        })}
      </div>
    </>
  )
}

const style = {
  headerTitle: `text-xl leading-6`,
  typesContentContainer: `flex py-8 gap-2 w-full`,
  selectTypeButton: `bg-zinc-800 rounded-lg py-5 w-24 flex-1 flex flex-col items-center gap-2 border-2 border-transparent hover:border-brand-500 focus:border-brand-500 focus:outline-none`,
}

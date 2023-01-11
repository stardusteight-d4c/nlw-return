import { ArrowLeft } from 'phosphor-react'
import { FormEvent, useState } from 'react'
import { FeedbackType, feedbackTypes } from '..'
import { supabase } from '../../../lib/supabase'
import { CloseButton } from '../../CloseButton'
import { Loading } from '../../Loading'
import { ScreenshotButton } from '../ScreenshotButton'
import ShortUniqueId from 'short-unique-id'
import { api } from '../../../lib/api'

interface FeedbackContentStepProps {
  feedbackType: FeedbackType
  onFeedbackRestartRequested: () => void
  onFeedbackSent: () => void
}

export function FeedbackContentStep({
  feedbackType,
  onFeedbackRestartRequested,
  onFeedbackSent,
}: FeedbackContentStepProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [comment, setComment] = useState('')
  const [isSendingFeedback, setSendingFeedback] = useState(false)
  const feedbackTypeInfo = feedbackTypes[feedbackType]
  const STORAGE_URL = `https://oxgapcqpowafqdnxqmoe.supabase.co/storage/v1/object/public/screenshots/`

  async function handleSubmmitFeedback(event: FormEvent) {
    event.preventDefault()
    setSendingFeedback(true)

    if (screenshot) {
      const uid = new ShortUniqueId({ length: 15 })
      const fileName = `${uid()}.png`

      function dataURLtoFile(dataurl: any, filename: string) {
        var arr = dataurl.split(','),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n)
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n)
        }
        return new File([u8arr], filename, { type: mime })
      }

      const file = dataURLtoFile(screenshot, fileName)
      const imageUrl = STORAGE_URL + fileName

      await supabase.storage
        .from('screenshots')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        })
        .then(async () => {
          await api.post('/feedbacks', {
            type: feedbackType,
            comment,
            screenshot: imageUrl,
          })
        })
        .catch((error) => console.log(error))
    } else {
      await api.post('/feedbacks', {
        type: feedbackType,
        comment,
        screenshot,
      })
    }

    setSendingFeedback(false)
    onFeedbackSent()
  }

  const backButtonProps = {
    button: {
      type: 'button' as 'button',
      className: style.backButton,
      onClick: onFeedbackRestartRequested,
    },
    icon: {
      weight: 'bold' as 'bold',
      className: style.arrowLeftIcon,
    },
  }

  return (
    <>
      <header>
        <button {...backButtonProps.button}>
          <ArrowLeft {...backButtonProps.icon} />
        </button>
        <span className={style.headerTitle}>
          <img
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
            className={style.feedbackTypeImage}
          />
          {feedbackTypeInfo.title}
        </span>
        <CloseButton />
      </header>

      <form onSubmit={handleSubmmitFeedback} className={style.formContainer}>
        <textarea
          className={style.textareaInput}
          placeholder="Conte com detalhes o que está acontecendo..."
          onChange={(event) => setComment(event.target.value)}
        />
        <footer className={style.footer}>
          <ScreenshotButton
            screenshot={screenshot}
            onScreenshotTook={setScreenshot}
          />
          <button
            type="submit"
            disabled={comment.length === 0 || isSendingFeedback}
            className={style.buttonSubmit}
          >
            {isSendingFeedback ? <Loading /> : 'Enviar feedback'}
          </button>
        </footer>
      </form>
    </>
  )
}

const style = {
  backButton: `top-5 left-5 absolute text-zinc-400 hover:text-zinc-100`,
  arrowLeftIcon: `w-4 h-4`,
  headerTitle: `text-xl leading-6 flex items-center gap-2`,
  feedbackTypeImage: `w-6 h-6`,
  formContainer: `my-4 w-full`,
  textareaInput: `min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent`,
  footer: `flex gap-2 mt-2`,
  buttonSubmit: `p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500`,
}

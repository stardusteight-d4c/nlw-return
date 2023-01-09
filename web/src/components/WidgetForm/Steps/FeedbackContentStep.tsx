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

    const uid = new ShortUniqueId({ length: 15 })
    const fileName = `${uid()}.png`

    const dataURLtoFile = (dataurl: any, filename: any) => {
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
    console.log('imageUrl', imageUrl);
    

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

    setSendingFeedback(false)
    onFeedbackSent()
  }

  return (
    <>
      <header>
        <button
          type="button"
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
          onClick={onFeedbackRestartRequested}
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>

        <span className="text-xl leading-6 flex items-center gap-2">
          <img
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
            className="w-6 h-6"
          />
          {feedbackTypeInfo.title}
        </span>

        <CloseButton />
      </header>

      <form onSubmit={handleSubmmitFeedback} className="my-4 w-full">
        <textarea
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent"
          placeholder="Conte com detalhes o que está acontecendo..."
          onChange={(event) => setComment(event.target.value)}
        />

        <footer className="flex gap-2 mt-2">
          <ScreenshotButton
            screenshot={screenshot}
            onScreenshotTook={setScreenshot}
          />

          <button
            type="submit"
            disabled={comment.length === 0 || isSendingFeedback}
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
          >
            {isSendingFeedback ? <Loading /> : 'Enviar feedback'}
          </button>
        </footer>
      </form>
    </>
  )
}

import { Widget } from './components/Widget'

export function App() {
  console.log('import.meta.env.VITE_API_URL', import.meta.env.VITE_API_URL)
  console.log(
    'import.meta.env.VITE_NEXT_PUBLIC_SUPABASE_ANON_KEY',
    import.meta.env.VITE_NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  return <Widget />
}

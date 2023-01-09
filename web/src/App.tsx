import { Widget } from './components/Widget'

export function App() {
  console.log('import.meta.env.VITE_API_URL', import.meta.env.VITE_API_URL)

  return <Widget />
}

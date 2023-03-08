import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="flex flex-col items-center px-6 py-2 text-sm font-medium bg-white border-2 border-black rounded-xl md:rounded-full md:justify-between md:gap-0 md:flex-row">
      <div className="comic-text relevance">
        <Link href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" className="hover:underline">
          © 2023 Cuack cuack
        </Link></div>
      <div className="text-black">Ningún pato fue dañado durante el desarrollo de la app</div>
      <div className="comic-text relevance">
        <Link href="https://github.com/owlnai/quackboard" className="hover:underline">
          #Hackafor2023
        </Link>
      </div>
    </footer>
  )
}

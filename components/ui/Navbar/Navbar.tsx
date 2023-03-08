import Link from 'next/link'
import Auth from '@/components/Auth'

export default function Header() {
  return (
        <header className="flex flex-col items-center justify-between gap-4 px-5 py-2 mb-4 font-medium bg-white border-2 border-black rounded-xl md:rounded-full md:gap-0 md:flex-row">
            <div className="font-semibold comic-text">
                <Link href="/" aria-label="Ir al inicio"><span aria-hidden="true" className="mr-1 [text-shadow:0_0]">🦆</span>Quackboard</Link>
            </div>
            <nav className="comic-text">
                <ul className="flex gap-8 justify-center">
                    <li>
                        <Link href="/">Inicio</Link>
                    </li>
                    <li>
                        <Link href="/about">Acerca de</Link>
                    </li>
                    <li>
                        <Link href="/songs">Lista de canciones</Link>
                    </li>
                </ul>
            </nav>
            <div className="flex gap-4">
                <Link className="flex items-center text-white !bg-amber-400 button" href="/songs/new">+ Crear canción</Link>
                <Auth />
            </div>
        </header>
  )
}

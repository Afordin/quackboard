import Link from 'next/link'
import Auth from '@/components/Auth'

export default function Header() {
  return (
        <header className="border-b pb-3 mb-6 font-medium flex justify-between items-center gap-4 sm:gap-0 flex-col sm:flex-row">
            <div className="font-semibold">
                <Link href="/" aria-label="Ir al inicio"><span aria-hidden="true">🦆</span>Cuack 0.1.0-alpha</Link>
            </div>
            <nav>
                <ul className="flex gap-8">
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
                <Link className="bg-gradient-to-r items-center flex from-pink-500 to-pink-800 text-white button" href="/songs/new">+ Crear canción</Link>
                <Auth />
            </div>
        </header>
  )
}

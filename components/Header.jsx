import Auth from "./Auth";
import Link from "next/link";

export default function Header() {
    return (
        <header className="border-b pb-3 mb-6 font-medium flex justify-between items-center gap-4 sm:gap-0 flex-col sm:flex-row">
            <div class="font-semibold">
                <Link href="/">🦆 Cuack 0.1.0-alpha</Link>
            </div>
            <nav>
                <ul class="flex gap-8">
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
            <div class="flex gap-4">
                <Link class="bg-gradient-to-r items-center flex from-pink-500 to-pink-800 text-white button" href="/songs/new">+ Crear canción</Link>
                <Auth />
            </div>
        </header>
    )
}
import Link from 'next/link'

export default function Home() {
  return (
    <section className="flex gap-6 flex-col xl:flex-row justify-between">
      <div className="">
        <h1 className="text-xl font-bold comic-title text-green-400 sm:text-6xl">
          El mejor piano
          <br />
          de <span className="text-amber-400">patos</span> para <span className="text-amber-400">patos</span>
        </h1>
        <p className="mx-auto mt-6 text-3xl font-medium leading-8 comic-text italic">
          Quack quack quack quack quack quack quack
        </p>
        <div className="mt-6 flex items-center  gap-x-6">
          <Link
            href="songs/new"
            className="button !bg-amber-400"
          >
            Tocar una canción
          </Link>
          <Link href="/songs" className="font-semibold leading-6 text-black">
            Ver canciones creadas <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
      <div className="rounded-2xl overflow-hidden h-56 aspect-video border-3 border-black comic-text relevance">
        <video src="/invasion.mp4" autoPlay loop muted />
      </div>
    </section>
  )
}

import Link from 'next/link'

export default function Home() {
  return (
    <section className="flex gap-6 flex-col xl:flex-row justify-between">
      <div className="">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          El mejor piano
          <br />
          de patos para patos.
        </h2>
        <p className="mx-auto mt-6 text-lg leading-8 text-gray-600">
          Quack quack quack quack quack quack quack quack quack
        </p>
        <div className="mt-6 flex items-center  gap-x-6">
          <Link
            href="songs/new"
            className="rounded-md bg-pink-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
          >
            Tocar una canción
          </Link>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Ver canciones creadas <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
      <div className="rounded-2xl overflow-hidden h-56 aspect-video">
        <video src="/invasion.mp4" autoPlay loop muted />
      </div>
    </section>
  )
}

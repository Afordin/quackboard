import Image from 'next/image'
import Link from 'next/link'
const people = [
  {
    name: 'owlnai',
    role: 'Diseño y código',
    imageUrl:
            'https://avatars.githubusercontent.com/u/20427094?s=64&v=4',
  },
  {
    name: 'adriDiazz',
    role: 'Diseño y código',
    imageUrl:
            'https://avatars.githubusercontent.com/u/90914879?s=64&v=4',
  },
  // More people...
]

export default function Home() {
  return (
        <section>
            <div className="max-w-2xl">
              <h1 className="text-xl font-bold supershadow-title text-green-400 sm:text-5xl">Acerca de</h1>
              <p className="mt-2 text-lg leading-8 supershadow-text test">
                  Quack es un teclado de patos creado para la Hackafor 2023. Hecho con Next.js. Alojado en Vercel. ▲
                </p>
            </div>
            <ul role="list" className="flex gap-12 mt-6">
                {people.map(person => (
                    <li key={person.name}> <Link href={`github.com/${person.name}`}>
                        <div className="flex items-center gap-x-6 bg-white border-2 border-black rounded-xl overflow-hidden pr-3 hover:scale-[.98]">
                            <Image className="h-16 w-16" width="64" height="64" src={person.imageUrl} alt="" />
                            <div>
                                <h3 className="text-base font-semibold leading-7 tracking-tight text-amber-300 supershadow-text test">{person.name}</h3>
                                <p className="text-sm font-semibold leading-6 text-black">{person.role}</p>
                                </div>
                        </div>
                    </Link>
                    </li>
                ))}

            </ul>
        </section>
  )
}

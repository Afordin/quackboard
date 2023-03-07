import Image from 'next/image'

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
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Acerca de</h2>
                <p className="mt-2 text-lg leading-8 text-gray-600">
                    Quack es un teclado de patos creado para la Hackafor 2023.
                </p>
            </div>
            <ul role="list" className="flex gap-12 mt-6">
                {people.map(person => (
                    <li key={person.name}>
                        <div className="flex items-center gap-x-6">
                            <Image className="h-16 w-16 rounded-full" width="64" height="64" src={person.imageUrl} alt="" />
                            <div>
                                <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                                <p className="text-sm font-semibold leading-6 text-pink-700">{person.role}</p>
                            </div>
                        </div>
                    </li>
                ))}

            </ul>
        </section>
  )
}

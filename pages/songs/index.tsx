import Quackboard from "../../components/Quackboard.jsx";

export default function List() {
    return (
        <section>
            <div className="max-w-2xl">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Lista de canciones</h2>
                <p className="my-2 text-lg leading-8 text-gray-600">
                    Test
                </p>
            </div>
            <ul role="list">
                <li>
                    <article>
                        <header>
                            <h2>Himno de la Alegría</h2>
                            <span>owlnai · 25/03/2023</span>
                        </header>
                    </article>
                </li>    
            </ul>
        </section>
    );
}
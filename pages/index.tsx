import Head from 'next/head'
import Auth from '../components/Auth';
import Quackboard from "../components/Quackboard.jsx";

export default function Home() {
  return (
      <section>
        <Auth />
        <Quackboard />
        <h1 className="text-3xl font-bold underline">
          Página de inicio
        </h1>
      </section>
  );
}
import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout';

export default function Home() {
    return (
        <Layout home>
            <Head>
                <title>About - {siteTitle}</title>
            </Head>
            <section>
                <h1 className="text-3xl font-bold underline">
                    El about
                </h1>
            </section>
        </Layout>
    );
}
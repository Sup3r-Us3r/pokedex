import Head from 'next/head';

type LayoutWithChildren<T = {}> =
  T & {children: React.ReactNode}

type LayoutProps = LayoutWithChildren<{
  title: string;
}>;

const Layout = ({ children, title }: LayoutProps) => {
  return (
    <div className="bg-gray-300">
      <Head>
        <title>{title}</title>
      </Head>

      <main className="container mx-auto max-w-xl pt-8 min-h-screen">
        {children}
      </main>
    </div>
  );
}

export default Layout;


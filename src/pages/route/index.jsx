import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function RouterComp() {
  const router = useRouter();
  console.log('router ', router);
  const ID = router.query.id;

  function handleOnClick() {
    router.push('/');
  }
  return (
    <>
      <Head>Hello router</Head>
      <h1>
        Hello Id :
        {ID}
      </h1>
      <Link href="/">
        <button className="active">go to dashboard</button>
      </Link>
      <button onClick={handleOnClick}> go to home page</button>
    </>
  );
}

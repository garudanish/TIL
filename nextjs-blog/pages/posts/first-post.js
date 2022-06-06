import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/layout";

const FistPost = () => {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          <a>Back to Home</a>
        </Link>
      </h2>
    </Layout>
  );
};

export default FistPost;

import React from "react";
import Link from "next/link";

const FistPost = () => {
  return (
    <>
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          <a>Back to Home</a>
        </Link>
      </h2>
    </>
  );
};

export default FistPost;

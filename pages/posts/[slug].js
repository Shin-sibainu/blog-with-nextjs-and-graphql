import styles from "../../styles/Slug.module.css";
import { GraphQLClient, gql } from "graphql-request";
import Link from "next/link";

const graphcms = new GraphQLClient(
  "https://api-ap-northeast-1.graphcms.com/v2/cl496hyz30x2v01wdga9ociv5/master"
);

const QUERY = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
      id
      title
      slug
      date
      author {
        id
        name
        avator {
          url
        }
      }
      content {
        html
      }
      photo {
        id
        url
      }
    }
  }
`;

const SLUG_LIST = gql`
  {
    posts {
      slug
    }
  }
`;

export async function getStaticPaths() {
  const { posts } = await graphcms.request(SLUG_LIST);
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const data = await graphcms.request(QUERY, { slug });
  const post = data.post;
  return {
    props: {
      post,
    },
    revalidate: 10,
  };
}

export default function BlogPost({ post }) {
  return (
    <main className={styles.blog}>
      <h2>{post.title}</h2>
      <img src={post.photo.url} alt="" className={styles.photo} />
      <div className={styles.title}>
        <div className={styles.authorText}>
          <h6>By {post.author.name}</h6>
          <h6 className={styles.date}>{post.date}</h6>
        </div>
      </div>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: post.content.html }}
      ></div>
      <div className={styles.backButton}>
        <Link href="/">
          <span>←もどる</span>
        </Link>
      </div>
    </main>
  );
}

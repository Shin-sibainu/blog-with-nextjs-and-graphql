import Link from "next/link";
import styles from "../styles/BlogCard.module.css";

const BlogCard = ({ title, author, photo, slug, date }) => {
  return (
    <div className={styles.card}>
      <Link href={"/posts/" + slug}>
        <div className={styles.imgContainer}>
          <img src={photo.url} alt="" />
        </div>
      </Link>
      <div className={styles.text}>
        <h2>{title}</h2>
        <div className={styles.details}>
          <div className={styles.author}>
            <img src={author.avator.url} alt="" />
            <h3>{author.name}</h3>
          </div>
          <div className={styles.date}>
            <h3>{date}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;

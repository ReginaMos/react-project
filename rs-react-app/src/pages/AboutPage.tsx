import AuthorInfo from '../components/AuthorInfoComponent';
import RSSInfo from '../components/RSSInfo';
import '../styles/AboutPage/About.css';

export default function AboutPage() {
  return (
    <div className="about-page">
      <AuthorInfo />
      <RSSInfo />
    </div>
  );
}

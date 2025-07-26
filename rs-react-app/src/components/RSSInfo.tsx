import logo from '../assets/rs.png';
import '../styles/AboutPage/RSSInfo.css';

export default function RSSInfo() {
  return (
    <div className="rss-info">
      <div className="rss-text">
        My journey in React began in <b>Rolling Scopes School</b> in July, 2025.
        You can also join - click on the logo!
      </div>
      <a
        href="https://rs.school/courses/reactjs"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={logo} className="logo" alt="rss-logo"></img>
      </a>
    </div>
  );
}

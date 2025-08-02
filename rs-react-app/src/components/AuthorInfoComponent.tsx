import LinkedIn from '../assets/linkedin.webp';
import GitHub from '../assets/GitHub.png';
import '../styles/AboutPage/AuthorInfo.css';

export default function AuthorInfo() {
  return (
    <>
      <div className="author-heading">
        Hello, my name is <b>Regina</b> and I`m author of this app!
      </div>

      <div className="description">
        I am a creative person with an analytical mind. I approach my work
        responsibly, I try to do everything on time and with high quality.
      </div>

      <div className="description">
        I have good knowledge and experience in the layout of layouts of varying
        complexity using HTML&CSS&JS, as well as creating components on Vue JS
        and React JS. I consider front-end development an interesting direction,
        where I see prospects for developing my skills and want to continue
        developing in this area.
      </div>

      <div className="contacts">
        <div className="contacts-heading">Contact with me:</div>

        <a
          href="https://www.linkedin.com/in/regina-moiseeva-158821284/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={LinkedIn} alt="linkedin-logo" className="logo" />
        </a>

        <a
          href="https://github.com/ReginaMos"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={GitHub} alt="github-logo" className="logo" />
        </a>
      </div>
    </>
  );
}

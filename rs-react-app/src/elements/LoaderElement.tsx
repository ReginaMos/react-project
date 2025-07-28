import '../styles/Loader.css';

export default function Loader() {
  return (
    <>
      <div className="loader">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </div>
      <div className="overlay"></div>
    </>
  );
}

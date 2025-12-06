import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__info">
        <span className="footer__text">Developed by Robert Norton</span>
      </div>
      <div className="footer__year">
        <span className="footer__text">{currentYear}</span>
      </div>
    </footer>
  );
}

export default Footer;
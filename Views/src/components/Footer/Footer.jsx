import { useTheme } from '@contexts/Theme';
import './Footer.css';

function Footer({ children }) {
  const { theme } = useTheme();
  return (
    <footer className={`footer ${theme}`} id="footer-transition">
      {children}
    </footer>
  );
}

export default Footer;

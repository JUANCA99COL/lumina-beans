import { motion } from 'framer-motion';

function scrollToHash(e, hash) {
  e.preventDefault();
  const target = document.querySelector(hash);
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const colVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const linkVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function Footer() {
  return (
    <footer className="site-footer" id="footer">
      <div className="footer-top">
        <motion.div
          className="footer-brand"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
        >
          Lumina<br />Beans
        </motion.div>

        <div className="footer-cols">
          <motion.div
            className="footer-col"
            variants={colVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
          >
            <motion.a variants={linkVariants} href="#home" onClick={(e) => scrollToHash(e, '#home')}>Home</motion.a>
            <motion.a variants={linkVariants} href="#offer" onClick={(e) => scrollToHash(e, '#offer')}>Shop</motion.a>
            <motion.a variants={linkVariants} href="#reviews" onClick={(e) => scrollToHash(e, '#reviews')}>Reviews</motion.a>
            <motion.a variants={linkVariants} href="#contact" onClick={(e) => scrollToHash(e, '#contact')}>Contact Us</motion.a>
          </motion.div>
          <motion.div
            className="footer-col"
            variants={colVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
          >
            <motion.a variants={linkVariants} href="#offer" onClick={(e) => scrollToHash(e, '#offer')}>Bourbon</motion.a>
            <motion.a variants={linkVariants} href="#offer" onClick={(e) => scrollToHash(e, '#offer')}>Typica</motion.a>
            <motion.a variants={linkVariants} href="#offer" onClick={(e) => scrollToHash(e, '#offer')}>Caturra</motion.a>
          </motion.div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>2024 &copy; Lumina Beans. All rights reserved.</span>
        <span className="footer-legal"><a href="#">Terms of Use</a><a href="#">Privacy Policy</a></span>
      </div>
    </footer>
  );
}

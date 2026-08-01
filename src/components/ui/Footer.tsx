/**
 * NEXUS COUNTDOWN — Footer
 * 
 * Minimal footer with social links, legal links,
 * and keyboard shortcut hint.
 */

import { motion } from 'framer-motion';
import { Linkedin, Instagram } from 'lucide-react';
import { nexusConfig } from '../../config/nexus.config';

const socialIcons: Record<string, React.ReactNode> = {
  linkedin: <Linkedin size={18} />,
  instagram: <Instagram size={18} />,
};

export function Footer() {
  return (
    <motion.footer
      className="footer"
      id="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <div className="footer-inner">
        {/* Social links */}
        <div className="footer-social">
          {nexusConfig.social.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              className="footer-social-link nexus-link"
              aria-label={link.label}
              target="_blank"
              rel="noopener noreferrer"
            >
              {socialIcons[link.platform] || link.platform}
            </a>
          ))}
        </div>

        {/* Legal / Footer text */}
        <p className="footer-text">{nexusConfig.footer.text}</p>

        {/* Footer links */}
        <div className="footer-links">
          {nexusConfig.footer.links.map((link) => (
            <a key={link.text} href={link.url} className="footer-link nexus-link">
              {link.text}
            </a>
          ))}
        </div>

        {/* Keyboard shortcut hint */}
        {nexusConfig.features.commandPalette && (
          <p className="footer-hint">
            Press <kbd>⌘K</kbd> for commands
          </p>
        )}
      </div>
    </motion.footer>
  );
}

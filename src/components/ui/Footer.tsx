/**
 * NEXUS COUNTDOWN — Footer
 * 
 * Minimal footer with social links, legal links,
 * and keyboard shortcut hint.
 */

import { motion } from 'framer-motion';
import { nexusConfig } from '../../config/nexus.config';

/**
 * lucide-react v1 removed brand/logo icons (LinkedIn, Instagram, Twitter, etc.)
 * so these are defined inline instead of imported. Sourced from Feather Icons
 * (MIT licensed, the same icon set lucide-react itself was forked from).
 */
function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

const socialIcons: Record<string, React.ReactNode> = {
  linkedin: <LinkedinIcon size={18} />,
  instagram: <InstagramIcon size={18} />,
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

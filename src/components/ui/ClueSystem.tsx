/**
 * NEXUS COUNTDOWN — Clue System
 * 
 * Locked/unlocked clue cards with blur reveal,
 * scheduled unlock, and optional password protection.
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Eye } from 'lucide-react';
import { nexusConfig } from '../../config/nexus.config';
import type { ClueConfig } from '../../types';

export function ClueSystem() {
  if (!nexusConfig.features.clues || nexusConfig.clues.length === 0) return null;

  return (
    <section className="clues-section" id="clues-section" aria-label="Clues">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
      >
        SIGNALS
      </motion.h2>
      <div className="clues-grid">
        {nexusConfig.clues.map((clue, i) => (
          <ClueCard key={clue.id} clue={clue} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ─── Individual Clue Card ─────────────────────────────── */

interface ClueCardProps {
  clue: ClueConfig;
  index: number;
}

function ClueCard({ clue, index }: ClueCardProps) {
  const [revealed, setRevealed] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [error, setError] = useState('');

  /** Check if clue should be unlocked based on date */
  const isTimeLocked = useMemo(() => {
    if (!clue.unlockDate) return false;
    return new Date(clue.unlockDate).getTime() > Date.now();
  }, [clue.unlockDate]);

  const isLocked = clue.locked && (isTimeLocked || (!revealed && !isTimeLocked));

  const handleReveal = () => {
    if (!clue.locked) return;

    if (clue.passwordProtected) {
      setShowPasswordModal(true);
      return;
    }

    if (isTimeLocked) return;
    setRevealed(true);
  };

  const handlePasswordSubmit = () => {
    if (passwordInput === clue.password) {
      setRevealed(true);
      setShowPasswordModal(false);
      setError('');
    } else {
      setError('Invalid code');
    }
  };

  return (
    <>
      <motion.div
        className={`clue-card ${isLocked && !revealed ? 'clue-locked' : 'clue-unlocked'}`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: index * 0.15 }}
        onClick={handleReveal}
        role="article"
        aria-label={`Clue: ${clue.title}`}
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleReveal()}
      >
        <div className="clue-icon">
          {isLocked && !revealed ? <Lock size={20} /> : <Unlock size={20} />}
        </div>
        <h3 className="clue-title">{clue.title}</h3>
        <p className={`clue-content ${isLocked && !revealed ? 'clue-blurred' : ''}`}>
          {clue.content}
        </p>
        {isLocked && !revealed && (
          <div className="clue-overlay">
            <Eye size={24} />
            <span>{isTimeLocked ? 'Unlocks soon' : 'Click to reveal'}</span>
          </div>
        )}
      </motion.div>

      {/* Password Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPasswordModal(false)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3>Enter Access Code</h3>
              <input
                type="password"
                className="modal-input"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handlePasswordSubmit()}
                placeholder="Access code"
                autoFocus
              />
              {error && <p className="modal-error">{error}</p>}
              <button className="nexus-btn nexus-btn-primary" onClick={handlePasswordSubmit}>
                Submit
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

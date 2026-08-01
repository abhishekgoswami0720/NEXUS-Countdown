/**
 * NEXUS COUNTDOWN — Command Palette
 * 
 * Keyboard-driven command palette (Cmd/Ctrl + K).
 * Search through themes, shortcuts, and navigation.
 * Glassmorphism modal with keyboard navigation.
 */

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../stores/appStore';
import { themes, applyTheme } from '../../theme/themes';
import { nexusConfig } from '../../config/nexus.config';

interface Command {
  id: string;
  label: string;
  category: string;
  action: () => void;
  shortcut?: string;
}

export function CommandPalette() {
  const isOpen = useAppStore((s) => s.commandPaletteOpen);
  const setOpen = useAppStore((s) => s.setCommandPaletteOpen);
  const setTheme = useAppStore((s) => s.setActiveTheme);
  const toggleSound = useAppStore((s) => s.toggleSound);

  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  if (!nexusConfig.features.commandPalette) return null;

  /** Available commands */
  const commands = useMemo<Command[]>(() => {
    const cmds: Command[] = [];

    /* Theme commands */
    Object.values(themes).forEach((theme) => {
      cmds.push({
        id: `theme-${theme.name}`,
        label: `Switch to ${theme.label} theme`,
        category: 'Theme',
        action: () => {
          setTheme(theme.name);
          applyTheme(theme.name);
          setOpen(false);
        },
      });
    });

    /* Actions */
    cmds.push({
      id: 'toggle-sound',
      label: 'Toggle sound',
      category: 'Action',
      action: () => {
        toggleSound();
        setOpen(false);
      },
      shortcut: 'M',
    });

    cmds.push({
      id: 'close',
      label: 'Close palette',
      category: 'Action',
      action: () => setOpen(false),
      shortcut: 'Esc',
    });

    return cmds;
  }, [setTheme, toggleSound, setOpen]);

  /** Filter commands by search */
  const filtered = useMemo(() => {
    if (!search) return commands;
    const q = search.toLowerCase();
    return commands.filter(
      (cmd) =>
        cmd.label.toLowerCase().includes(q) ||
        cmd.category.toLowerCase().includes(q),
    );
  }, [commands, search]);

  /** Keyboard navigation */
  useEffect(() => {
    if (!isOpen) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter' && filtered[selectedIndex]) {
        e.preventDefault();
        filtered[selectedIndex].action();
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, filtered, selectedIndex, setOpen]);

  /** Focus input on open */
  useEffect(() => {
    if (isOpen) {
      setSearch('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  /** Global shortcut: Cmd/Ctrl + K */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(!isOpen);
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, setOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="command-palette-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />

          {/* Palette */}
          <motion.div
            className="command-palette"
            id="command-palette"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-label="Command palette"
          >
            <input
              ref={inputRef}
              className="command-palette-input"
              type="text"
              placeholder="Type a command..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setSelectedIndex(0);
              }}
              aria-label="Search commands"
            />

            <div className="command-palette-list">
              {filtered.map((cmd, i) => (
                <button
                  key={cmd.id}
                  className={`command-palette-item ${i === selectedIndex ? 'selected' : ''}`}
                  onClick={cmd.action}
                  onMouseEnter={() => setSelectedIndex(i)}
                >
                  <span className="command-palette-category">{cmd.category}</span>
                  <span className="command-palette-label">{cmd.label}</span>
                  {cmd.shortcut && (
                    <kbd className="command-palette-shortcut">{cmd.shortcut}</kbd>
                  )}
                </button>
              ))}
              {filtered.length === 0 && (
                <p className="command-palette-empty">No commands found</p>
              )}
            </div>

            <div className="command-palette-footer">
              <span><kbd>↑↓</kbd> Navigate</span>
              <span><kbd>↵</kbd> Select</span>
              <span><kbd>Esc</kbd> Close</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

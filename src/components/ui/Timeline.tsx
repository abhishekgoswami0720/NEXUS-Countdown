/**
 * NEXUS COUNTDOWN — Timeline
 * 
 * Elegant vertical timeline showing project milestones.
 * Completed milestones animate differently from upcoming ones.
 */

import { motion } from 'framer-motion';
import { Check, Circle } from 'lucide-react';
import { nexusConfig } from '../../config/nexus.config';

export function Timeline() {
  if (!nexusConfig.features.timeline || nexusConfig.timeline.length === 0) return null;

  return (
    <section className="timeline-section" id="timeline-section" aria-label="Timeline">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
      >
        TRAJECTORY
      </motion.h2>

      <div className="timeline">
        {nexusConfig.timeline.map((item, i) => (
          <motion.div
            key={item.id}
            className={`timeline-item ${item.completed ? 'timeline-completed' : 'timeline-upcoming'}`}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
          >
            <div className="timeline-marker">
              {item.completed ? (
                <div className="timeline-check">
                  <Check size={14} />
                </div>
              ) : (
                <div className="timeline-dot">
                  <Circle size={10} />
                </div>
              )}
              {i < nexusConfig.timeline.length - 1 && <div className="timeline-line" />}
            </div>

            <div className="timeline-content">
              <span className="timeline-date">{item.date}</span>
              <h3 className="timeline-title">{item.title}</h3>
              <p className="timeline-description">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

import { useState } from 'react';
import './App.css';
import { PortalCard } from './PortalCard';
import { PopoverCard } from './PopoverCard';

export default function App() {
  const [portalOpen, setPortalOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <div className="app">
      <h1>Portal vs. Popover — CSS Custom Property Inheritance</h1>

      <p className="intro">
        Both buttons open the <em>same card component</em>. The card reads its
        styles from CSS custom properties (<code>--card-bg</code>,{' '}
        <code>--card-border</code>, etc.) defined on <code>.app</code>.
      </p>

      <div className="columns">
        {/* ── Portal column ── */}
        <div className="column">
          <h2>Portal (createPortal)</h2>
          <button className="trigger" onClick={() => setPortalOpen(true)}>
            Open portal card
          </button>
          <p className="explanation">
            The card is rendered into <code>document.body</code> — outside the{' '}
            <code>.app</code> element. Because CSS custom properties are{' '}
            <strong>inherited through the DOM</strong>, and the card is no longer
            a descendant of <code>.app</code>, it does{' '}
            <strong>not</strong> receive the custom properties.
            The card falls back to its hardcoded defaults (white / black).
          </p>
        </div>

        {/* ── Popover column ── */}
        <div className="column">
          <h2>Popover API</h2>
          <button className="trigger" onClick={() => setPopoverOpen(true)}>
            Open popover card
          </button>
          <p className="explanation">
            The card element stays in the <code>.app</code> DOM subtree — it is
            just <em>painted</em> in the browser's top layer. Because it remains
            a DOM descendant of <code>.app</code>, it <strong>does</strong>{' '}
            inherit the custom properties and renders with the correct theme
            colors.
          </p>
        </div>
      </div>

      {/*
        PortalCard mounts its DOM at document.body (outside .app).
        PopoverCard stays here, inside .app, inheriting its CSS vars.
      */}
      <PortalCard open={portalOpen} onClose={() => setPortalOpen(false)} />
      <PopoverCard open={popoverOpen} onClose={() => setPopoverOpen(false)} />
    </div>
  );
}

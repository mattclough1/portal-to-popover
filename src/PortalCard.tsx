import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { CardContent } from './Card';

interface PortalCardProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Renders the card into document.body via a React portal.
 * Because the container div lives at the top of the DOM — outside
 * the .app element — it does NOT inherit the CSS custom properties
 * defined on .app. The card will fall back to its default values.
 */
export function PortalCard({ open, onClose }: PortalCardProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="overlay"
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      {/* This .card div lives at document.body — no CSS vars inherited */}
      <div className="card card--portal">
        <CardContent />
        <button className="card-close" onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body,
  );
}

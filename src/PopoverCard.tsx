import { useEffect, useRef } from 'react';
import { CardContent } from './Card';

interface PopoverCardProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Renders the card as a native popover element.
 * The div stays in the .app DOM subtree, so it inherits the CSS
 * custom properties defined on .app — even though it's promoted to
 * the browser's top layer for painting.
 */
export function PopoverCard({ open, onClose }: PopoverCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current as (HTMLDivElement & { showPopover(): void; hidePopover(): void }) | null;
    if (!el) return;
    if (open) {
      el.showPopover();
    } else {
      try { el.hidePopover(); } catch { /* already hidden */ }
    }
  }, [open]);

  // Sync React state when the popover is dismissed natively (e.g. light-dismiss / Escape)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    function handleToggle(e: Event) {
      if ((e as ToggleEvent).newState === 'closed') onClose();
    }
    el.addEventListener('toggle', handleToggle);
    return () => el.removeEventListener('toggle', handleToggle);
  }, [onClose]);

  return (
    <div ref={ref} popover="auto" className="card card--popover">
      <CardContent />
      <button className="card-close" onClick={onClose}>Close</button>
    </div>
  );
}

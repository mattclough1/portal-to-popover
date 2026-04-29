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
      // hidePopover throws if already hidden — guard against that
      try { el.hidePopover(); } catch { /* already hidden */ }
    }
  }, [open]);

  // Sync React state when the popover is dismissed natively (e.g. light-dismiss)
  function handleToggle(e: React.SyntheticEvent<HTMLDivElement>) {
    const event = e.nativeEvent as ToggleEvent;
    if (event.newState === 'closed') onClose();
  }

  return (
    <div ref={ref} popover="auto" className="card card--popover" onToggle={handleToggle}>
      <CardContent />
      <button className="card-close" onClick={onClose}>Close</button>
    </div>
  );
}

/**
 * Renders the card's inner content only — no outer wrapper.
 * The caller is responsible for the container element so that
 * the portal version and the popover version can each own their
 * own container (one lives at document.body, the other stays in
 * the .app subtree and inherits its CSS custom properties).
 */
export function CardContent() {
  return (
    <>
      <h3>Card Component</h3>
      <p>
        This card reads its styles from CSS custom properties:
      </p>
      <ul style={{ paddingLeft: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <li><code>--card-bg</code></li>
        <li><code>--card-border</code></li>
        <li><code>--card-text</code></li>
        <li><code>--card-accent</code></li>
      </ul>
    </>
  );
}

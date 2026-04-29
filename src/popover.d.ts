// The Popover API landed in browsers but isn't in older TS DOM libs.
// Extend React's HTMLAttributes so `popover` is accepted on any element.
import 'react';

declare module 'react' {
  interface HTMLAttributes<T> {
    popover?: 'auto' | 'manual' | '' | undefined;
  }
}

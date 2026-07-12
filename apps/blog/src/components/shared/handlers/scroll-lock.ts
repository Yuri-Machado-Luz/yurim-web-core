/**
 * Shared body-scroll lock with reference counting.
 *
 * The Navbar's mobile drawer and the posts sidebar drawer are independent
 * components that can each need to lock page scroll. Without a shared
 * counter, closing one drawer would blindly reset `overflow` to "" even
 * while the other drawer is still open, silently re-enabling scroll behind
 * an open backdrop.
 */

const locks = new Set<string>();

export function setScrollLock(id: string, locked: boolean) {
  if (locked) {
    locks.add(id);
  } else {
    locks.delete(id);
  }
  document.body.style.overflow = locks.size > 0 ? "hidden" : "";
}

/** Call on page swaps (astro:before-preparation) to avoid stale locks. */
export function clearScrollLock(id: string) {
  setScrollLock(id, false);
}

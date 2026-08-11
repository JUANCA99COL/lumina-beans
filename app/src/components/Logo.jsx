export default function Logo() {
  return (
    <>
      <svg viewBox="0 0 64 64" className="logo-mark" aria-hidden="true">
        <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path d="M32 14 C 24 14 18 21 18 30 C 18 40 24 46 32 46 C 40 46 46 40 46 30 C 46 21 40 14 32 14 Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path d="M20 30c4-3 8 3 12 0s8-3 12 0" fill="none" stroke="currentColor" strokeWidth="1.1" />
        <path d="M32 8v6M32 50v6M12 32H6M58 32h-6M15 15l4 4M45 45l4 4M49 15l-4 4M19 45l-4 4" stroke="currentColor" strokeWidth="1.1" />
      </svg>
      <span className="logo-word">LuminaBeans</span>
    </>
  );
}

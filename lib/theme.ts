export type ThemeConfig = Record<string, string>;

export function applyTheme(theme: ThemeConfig = {}): void {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  Object.entries(theme).forEach(([key, value]) => {
    // Map keys to CSS custom properties, e.g., { 'primary-color': '#123456' } -> --primary-color
    root.style.setProperty(`--${key}`, value);
  });
}

/** Remove inline **bold** markers for plain-text contexts (search, aria). */
export function stripMd(md: string) {
  return md.replace(/\*\*/g, '');
}

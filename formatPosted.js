const DAY = 24 * 60 * 60 * 1000;

// Gør et tidsstempel til tekst som "3 dage siden".
export function formatPosted(createdAt) {
  const days = Math.floor((Date.now() - createdAt) / DAY);
  if (days <= 0) return 'I dag';
  if (days === 1) return '1 dag siden';
  if (days < 7) return `${days} dage siden`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return weeks === 1 ? '1 uge siden' : `${weeks} uger siden`;
  const months = Math.floor(days / 30);
  return months <= 1 ? '1 måned siden' : `${months} måneder siden`;
}

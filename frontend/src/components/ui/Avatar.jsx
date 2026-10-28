/** Avatar – initials circle. */
export default function Avatar({ name = '', initials, size = '', tone = '' }) {
  const derived =
    initials ||
    name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0])
      .join('')
      .toUpperCase() ||
    '?';

  return <span className={`avatar ${size} ${tone}`}>{derived}</span>;
}
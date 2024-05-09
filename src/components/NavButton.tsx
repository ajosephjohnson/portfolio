"use client";

import { useSmoothScroll } from "@/hooks";

export default function NavButton({
  sectionName,
  isActive,
}: {
  sectionName: string,
  isActive: boolean,
}) {
  const smoothScroll = useSmoothScroll(sectionName);

  const activeClass = isActive ? 'text-white' : '';

  const displayName = sectionName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <button
      onClick={smoothScroll}
      className={`transition-colors duration-300 hover:text-white py-3 px-4 ${activeClass}`}
    >
      {displayName}
    </button>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export type BadgeTone = 'positive' | 'negative' | 'accent' | 'neutral';

interface StatusBadgeProps {
  label: string;
  tone?: BadgeTone;
  className?: string;
  onClick?: () => void;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  label,
  tone = 'neutral',
  className = '',
  onClick,
}) => {
  // Infer tone if not explicitly passed
  let resolvedTone = tone;
  const l = label.toLowerCase();

  if (
    l.includes('fully feasible') ||
    l.includes('window safe') ||
    l.includes('adequate') ||
    l.includes('active') ||
    l.includes('compliant') ||
    l.includes('healthy')
  ) {
    resolvedTone = 'positive';
  } else if (
    l.includes('late') ||
    l.includes('critical') ||
    l.includes('stockout') ||
    l.includes('over-allocated') ||
    l.includes('overstay') ||
    l.includes('breach') ||
    l.includes('error')
  ) {
    resolvedTone = 'negative';
  } else if (l.includes('split') || l.includes('partial') || l.includes('nearest')) {
    resolvedTone = 'accent';
  }

  const toneStyles: Record<BadgeTone, string> = {
    positive: 'bg-[#00C853]/10 text-[#00C853] font-semibold border border-[#00C853]/20',
    negative: 'bg-[#D32F2F]/10 text-[#D32F2F] font-semibold border border-[#D32F2F]/20',
    accent: 'bg-[#2251FF]/10 text-[#2251FF] font-medium border border-[#2251FF]/20',
    neutral: 'bg-[#051C2C]/5 text-[#051C2C]/70 font-medium border border-[#051C2C]/10',
  };

  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center px-2.5 py-0.5 text-[11px] rounded-full whitespace-nowrap transition-all ${
        onClick ? 'interactive-cell' : ''
      } ${toneStyles[resolvedTone]} ${className}`}
    >
      {label}
    </span>
  );
};

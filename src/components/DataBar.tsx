/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface DataBarProps {
  value: number;
  max: number;
  showText?: boolean;
  unit?: string;
  className?: string;
}

export const DataBar: React.FC<DataBarProps> = ({
  value,
  max,
  showText = true,
  unit = '',
  className = '',
}) => {
  const percentage = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex-1 min-w-[50px] max-w-[100px] h-2 bg-[#051C2C]/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#2251FF] rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showText && (
        <span className="text-[12px] tabular-nums font-medium text-[#051C2C] shrink-0">
          {value.toLocaleString()}
          {unit ? ` ${unit}` : ''}
        </span>
      )}
    </div>
  );
};

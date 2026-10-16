/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface KPICardProps {
  label: string;
  value: string | number;
  subtext?: string;
  badge?: string;
  isAnomaly?: boolean;
}

export const KPICard: React.FC<KPICardProps> = ({
  label,
  value,
  subtext,
  badge,
  isAnomaly = false,
}) => {
  return (
    <div className={`ofia-card p-5 ${isAnomaly ? 'anomaly-row' : ''}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#888888]">
          {label}
        </span>
        {badge && (
          <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-[#051C2C]/5 text-[#051C2C]">
            {badge}
          </span>
        )}
      </div>

      <div
        className={`font-garamond text-[32px] sm:text-[36px] font-bold tracking-display leading-tight ${
          isAnomaly ? 'text-[#D32F2F]' : 'text-[#051C2C]'
        }`}
      >
        {value}
      </div>

      {subtext && (
        <div className={`text-[12px] mt-1.5 ${isAnomaly ? 'text-[#D32F2F] font-medium' : 'text-[#888888]'}`}>
          {subtext}
        </div>
      )}
    </div>
  );
};

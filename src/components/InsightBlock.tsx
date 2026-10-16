/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Lightbulb, ArrowRight } from 'lucide-react';

interface InsightBlockProps {
  title: string;
  summary: string;
  action?: string;
  onActionClick?: () => void;
}

export const InsightBlock: React.FC<InsightBlockProps> = ({
  title,
  summary,
  action,
  onActionClick,
}) => {
  return (
    <div className="insight-block p-4 my-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div className="flex items-start gap-3">
        <Lightbulb className="w-5 h-5 text-[#2251FF] shrink-0 mt-0.5" />
        <div>
          <h4 className="text-[13px] font-semibold text-[#051C2C] mb-0.5">{title}</h4>
          <p className="text-[12px] text-[#051C2C]/80 leading-relaxed">{summary}</p>
        </div>
      </div>
      {action && (
        <button
          onClick={onActionClick}
          className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold text-[#2251FF] hover:bg-[#2251FF]/10 rounded-[6px] transition-colors shrink-0"
        >
          <span>{action}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};

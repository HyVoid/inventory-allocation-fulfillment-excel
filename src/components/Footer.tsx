/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-16 border-t border-[#E8E8E6] bg-transparent py-8">
      <div className="max-w-[1400px] mx-auto px-[40px] flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] text-[#888888]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#2251FF]" />
          <span>
            Privacy &amp; Security Notice: All storage functionality of this tool runs locally in your browser's localStorage. No user data is retained, transmitted, or stored on external servers.
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span>OFIA Decision Engine v2.4</span>
          <span>•</span>
          <span>28 Hub Network Mode</span>
          <span>•</span>
          <span>Zero Server Footprint</span>
        </div>
      </div>
    </footer>
  );
};

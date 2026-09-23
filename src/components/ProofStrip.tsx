import React from 'react';
import { Calendar, Users, Sparkles } from 'lucide-react';
import { PROOF_STATS } from '../data';

export const ProofStrip: React.FC = () => {
  const icons = [
    <Calendar key="1" className="w-5 h-5 text-[#C93438]" />,
    <Users key="2" className="w-5 h-5 text-[#C93438]" />,
    <Sparkles key="3" className="w-5 h-5 text-[#C93438]" />
  ];

  return (
    <section className="bg-[#F6E4E1] border-b border-[#D9D2CA] py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-[#D9D2CA]">
          {PROOF_STATS.map((stat, idx) => (
            <div 
              key={stat.title}
              className={`flex items-start gap-4 ${idx !== 0 ? 'pt-6 md:pt-0 md:pr-8' : ''} ${idx !== PROOF_STATS.length - 1 ? 'pb-6 md:pb-0 md:pl-8' : ''}`}
            >
              <div className="w-11 h-11 rounded-[11px] bg-white border border-[#D9D2CA] flex items-center justify-center flex-shrink-0 shadow-sm">
                {icons[idx]}
              </div>
              <div className="text-right">
                <h3 className="text-[21px] font-bold text-[#211F1E] leading-tight mb-1.5 flex items-center gap-2">
                  <span className="text-[12px] font-mono text-[#C93438]">۰{idx + 1}</span>
                  <span>{stat.title}</span>
                </h3>
                <p className="text-[16px] text-[#6E665E] font-normal leading-[1.47]">
                  {stat.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

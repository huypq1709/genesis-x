import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Dna, ArrowRight, Check } from 'lucide-react';

interface DnaUploadProps {
  onContinue: () => void;
}

/* FIX: brightened palette + reframed to "wellness report sample" instead
   of gene editing. Shows two clear options (upload file / use synthetic
   baseline) with explicit supporting copy. */

export function DnaUpload({ onContinue }: DnaUploadProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const handleUpload = () => {
    setIsUploaded(true);
    setTimeout(onContinue, 800);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl mx-auto">

      <div className="text-center mb-10">
        <div className="inline-block px-3 py-1 bg-[var(--accent-soft)] text-[var(--accent-strong)] text-[10px] font-mono uppercase tracking-widest rounded-full mb-3">
          Step 1 of 5
        </div>
        <h2 className="text-3xl font-bold mb-3 text-[var(--text-primary)]">Provide your sample</h2>
        <p className="text-[var(--text-secondary)]">
          Upload your existing raw DNA file (23andMe / AncestryDNA) or start
          with a synthetic baseline to preview a sample report.
        </p>
      </div>

      <div
        className={`relative border-2 border-dashed p-12 flex flex-col items-center justify-center text-center transition-all duration-300 cursor-pointer group rounded-xl ${isUploaded ? 'border-[var(--accent)] bg-[var(--accent-soft)]' : isHovered ? 'border-[var(--accent)] bg-white shadow-lg shadow-[var(--accent-glow)]' : 'border-[var(--border-color)] bg-white'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleUpload}>

        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[var(--accent)] rounded-tl-md" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[var(--accent)] rounded-tr-md" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[var(--accent)] rounded-bl-md" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[var(--accent)] rounded-br-md" />

        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-colors duration-300 ${isUploaded ? 'bg-[var(--accent)] text-white' : 'bg-[var(--accent-soft)] text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white'}`}>

          {isUploaded ? <Check className="w-8 h-8" /> : <Upload className="w-6 h-6" />}
        </div>

        <h3 className="text-lg font-bold mb-2 text-[var(--text-primary)]">
          {isUploaded ? 'Sample accepted' : 'Upload your DNA file'}
        </h3>
        <p className="text-sm font-mono text-[var(--text-secondary)] mb-6">
          {isUploaded ?
            'Encrypting & queuing for analysis...' :
            'Supported: .fasta, .vcf, .bam, .txt (raw 23andMe/Ancestry)'}
        </p>

        {!isUploaded &&
          <div className="px-6 py-2.5 bg-white border border-[var(--border-color)] text-xs font-mono text-[var(--text-secondary)] group-hover:text-[var(--accent)] group-hover:border-[var(--accent)] transition-colors rounded-md">
            Browse Files
          </div>
        }
      </div>

      <div className="flex items-center gap-4 my-8">
        <div className="h-[1px] flex-1 bg-[var(--border-color)]" />
        <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest">
          or
        </span>
        <div className="h-[1px] flex-1 bg-[var(--border-color)]" />
      </div>

      <button
        onClick={onContinue}
        className="w-full py-4 bg-white border border-[var(--border-color)] text-[var(--text-primary)] font-mono text-sm hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors flex items-center justify-center gap-2 rounded-md shadow-sm">

        <Dna className="w-4 h-4" />
        Use a synthetic baseline to preview a sample report
        <ArrowRight className="w-4 h-4 opacity-50" />
      </button>

      <p className="mt-6 text-[10px] font-mono text-center text-[var(--text-muted)] uppercase tracking-widest">
        Files are encrypted in your browser. We never see raw sequence data.
      </p>
    </motion.div>);

}
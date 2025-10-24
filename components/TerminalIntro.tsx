// components/TerminalIntro.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const commands = [
  '$ whoami',
  'walid@portfolio:~$ Full-Stack Developer',
  '$ ls skills/',
  'React.js  Next.js  TypeScript  Node.js  MongoDB',
  '$ cat bio.txt',
  'Building the future of Arabic e-learning...',
  '$ ./run_portfolio.sh',
  'Portfolio loaded successfully ✓',
];

export function TerminalIntro({ onComplete }: { onComplete: () => void }) {
  const [displayedCommands, setDisplayedCommands] = useState<string[]>([]);
  
  useEffect(() => {
    commands.forEach((command, index) => {
      setTimeout(() => {
        setDisplayedCommands((prev) => [...prev, command]);
        if (index === commands.length - 1) {
          setTimeout(onComplete, 1000);
        }
      }, index * 500);
    });
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
    >
      <div className="font-mono text-green-400 max-w-2xl w-full p-8">
        {displayedCommands.map((command, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-2"
          >
            {command}
          </motion.div>
        ))}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          _
        </motion.span>
      </div>
    </motion.div>
  );
}
import React, { useMemo } from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface AnimatedParagraphProps {
  text: string;
  progress: MotionValue<number>;
  className?: string;
}

const Character: React.FC<{
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.18, 1]);
  const color = useTransform(progress, range, ['rgba(215, 226, 234, 0.25)', 'rgba(215, 226, 234, 1)']);

  return (
    <motion.span
      style={{ opacity, color }}
      className="inline-block transition-colors duration-75"
    >
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  );
};

export const AnimatedParagraph: React.FC<AnimatedParagraphProps> = ({
  text,
  progress,
  className = '',
}) => {
  const characters = useMemo(() => text.split(''), [text]);
  const total = characters.length;

  return (
    <p className={`leading-relaxed tracking-tight ${className}`}>
      {characters.map((char, index) => {
        const start = (index / total) * 0.9;
        const end = Math.min(1, start + 0.1);
        return (
          <Character
            key={index}
            char={char}
            progress={progress}
            range={[start, end]}
          />
        );
      })}
    </p>
  );
};

export const AnimatedText: React.FC<{
  text: string;
  progress: MotionValue<number>;
  className?: string;
}> = ({ text, progress, className = '' }) => {
  const paragraphs = useMemo(() => text.split('\n\n'), [text]);

  return (
    <div className={`space-y-6 ${className}`}>
      {paragraphs.map((para, i) => (
        <AnimatedParagraph
          key={i}
          text={para}
          progress={progress}
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-relaxed md:leading-[1.6]"
        />
      ))}
    </div>
  );
};

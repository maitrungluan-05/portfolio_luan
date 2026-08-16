import React, { useMemo } from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface CharacterProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Character: React.FC<CharacterProps> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.35, 1]);
  const color = useTransform(progress, range, [
    'rgba(186, 230, 253, 0.35)',
    'rgba(255, 255, 255, 1)',
  ]);
  const y = useTransform(progress, range, [3, 0]);

  return (
    <motion.span
      style={{ opacity, color, y }}
      className="inline-block transition-colors duration-150"
    >
      {char}
    </motion.span>
  );
};

interface WordProps {
  word: string;
  progress: MotionValue<number>;
  wordGlobalCharStartIndex: number;
  totalCharsInParagraph: number;
  paraStart: number;
  paraEnd: number;
}

const Word: React.FC<WordProps> = ({
  word,
  progress,
  wordGlobalCharStartIndex,
  totalCharsInParagraph,
  paraStart,
  paraEnd,
}) => {
  const characters = useMemo(() => word.split(''), [word]);

  return (
    <span className="inline-block whitespace-nowrap mr-[0.28em]">
      {characters.map((char, cIdx) => {
        const charGlobalIndex = wordGlobalCharStartIndex + cIdx;
        const charStart =
          paraStart +
          (charGlobalIndex / Math.max(1, totalCharsInParagraph)) *
            (paraEnd - paraStart) *
            0.88;
        const charEnd = Math.min(0.78, charStart + 0.08);

        return (
          <Character
            key={cIdx}
            char={char}
            progress={progress}
            range={[charStart, charEnd]}
          />
        );
      })}
    </span>
  );
};

interface AnimatedParagraphProps {
  text: string;
  progress: MotionValue<number>;
  paragraphIndex: number;
  totalParagraphs: number;
  className?: string;
}

export const AnimatedParagraph: React.FC<AnimatedParagraphProps> = ({
  text,
  progress,
  paragraphIndex,
  totalParagraphs,
  className = '',
}) => {
  const words = useMemo(() => text.split(' ').filter(Boolean), [text]);
  const totalChars = useMemo(() => text.length, [text]);

  const paraStart = 0.05 + (paragraphIndex / totalParagraphs) * 0.55;
  const paraEnd = paraStart + (1 / totalParagraphs) * 0.55;

  let runningCharCount = 0;

  return (
    <p className={`leading-relaxed tracking-normal ${className}`}>
      {words.map((word, wIdx) => {
        const currentWordStartIndex = runningCharCount;
        runningCharCount += word.length + 1; // +1 for space

        return (
          <Word
            key={wIdx}
            word={word}
            progress={progress}
            wordGlobalCharStartIndex={currentWordStartIndex}
            totalCharsInParagraph={totalChars}
            paraStart={paraStart}
            paraEnd={paraEnd}
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
  const total = paragraphs.length;

  return (
    <div className={`space-y-6 sm:space-y-8 ${className}`}>
      {paragraphs.map((para, i) => (
        <AnimatedParagraph
          key={i}
          text={para}
          progress={progress}
          paragraphIndex={i}
          totalParagraphs={total}
          className="text-base sm:text-xl md:text-2xl font-light leading-relaxed md:leading-[1.7]"
        />
      ))}
    </div>
  );
};

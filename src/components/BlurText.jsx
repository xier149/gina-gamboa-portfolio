import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const directions = {
  top: ["y", 1],
  bottom: ["y", -1],
  left: ["x", 1],
  right: ["x", -1],
};

const BlurText = ({
  text = "",
  delay = 110,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.2,
  rootMargin = "0px 0px -8% 0px",
  duration = 0.45,
  blur = 10,
  distance = 18,
  startDelay = 420,
  trigger = "view",
  color,
}) => {
  const ref = useRef(null);
  const armedRef = useRef(true);
  const timerRef = useRef(0);
  const reduceMotion = useReducedMotion();
  const isCompactViewport = typeof window !== "undefined" && window.innerWidth < 640;
  const effectiveStartDelay = isCompactViewport ? Math.min(startDelay, 120) : startDelay;
  const effectiveBlur = isCompactViewport ? Math.min(blur, 6) : blur;
  const effectiveDuration = isCompactViewport ? Math.min(duration, 0.35) : duration;
  const [visible, setVisible] = useState(trigger !== "view" || reduceMotion);
  const [axis, sign] = directions[direction] || directions.top;

  const pieces = useMemo(() => {
    if (animateBy === "characters") {
      return Array.from(text).map((character, index) => ({
        content: character === " " ? "\u00a0" : character,
        key: `character-${index}`,
      }));
    }
    return text.split(" ").map((word, index, words) => ({
      content: index === words.length - 1 ? word : `${word}\u00a0`,
      key: `word-${index}`,
    }));
  }, [animateBy, text]);

  useEffect(() => {
    if (trigger !== "view" || reduceMotion) {
      setVisible(true);
      return undefined;
    }
    const element = ref.current;
    if (!element) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (armedRef.current) {
          armedRef.current = false;
          timerRef.current = window.setTimeout(() => setVisible(true), Math.max(0, effectiveStartDelay));
        }
      } else {
        armedRef.current = true;
        window.clearTimeout(timerRef.current);
        setVisible(false);
      }
    }, { threshold, rootMargin });
    observer.observe(element);
    return () => {
      observer.disconnect();
      window.clearTimeout(timerRef.current);
    };
  }, [effectiveStartDelay, reduceMotion, rootMargin, threshold, trigger]);

  const hidden = {
    opacity: 0,
    filter: `blur(${Math.max(0, effectiveBlur)}px)`,
    [axis]: sign * distance,
  };
  const shown = { opacity: 1, filter: "blur(0px)", [axis]: 0 };

  return (
    <span ref={ref} className={className} style={{ color, display: "inline-block" }}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline-flex flex-wrap">
        {pieces.map((piece, index) => (
          <motion.span
            key={piece.key}
            initial={reduceMotion ? false : hidden}
            animate={visible || reduceMotion ? shown : hidden}
            transition={reduceMotion ? { duration: 0 } : { duration: effectiveDuration, delay: (index * delay) / 1000, ease: [0.33, 1, 0.68, 1] }}
            className="inline-block will-change-[transform,filter,opacity]"
          >
            {piece.content}
          </motion.span>
        ))}
      </span>
    </span>
  );
};

export default BlurText;

import { useEffect, useRef } from "react";

const ClickSpark = ({
  children,
  sparkColor = "#ed1268",
  sparkCount = 8,
  sparkRadius = 24,
  sparkSize = 8,
  sparkWidth = 2,
  duration = 420,
  className = "",
}) => {
  const rootRef = useRef(null);
  const burstsRef = useRef([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const onPointerDown = (event) => {
      if (event.pointerType === "touch" || event.button !== 0) return;
      const rect = root.getBoundingClientRect();
      burstsRef.current.push({ x: event.clientX - rect.left, y: event.clientY - rect.top, started: performance.now() });
      if (burstsRef.current.length === 1) requestAnimationFrame(draw);
    };
    const draw = (now) => {
      const rect = root.getBoundingClientRect();
      const sparks = burstsRef.current.filter((burst) => now - burst.started < duration);
      burstsRef.current = sparks;
      root.querySelectorAll(".click-spark-layer").forEach((layer) => layer.remove());
      sparks.forEach((burst) => {
        const progress = reduce ? 1 : Math.min(1, (now - burst.started) / duration);
        const layer = document.createElement("span");
        layer.className = "click-spark-layer";
        Object.assign(layer.style, { position: "absolute", inset: "0", pointerEvents: "none", zIndex: "10" });
        for (let index = 0; index < sparkCount; index += 1) {
          const angle = (Math.PI * 2 * index) / sparkCount;
          const distance = sparkRadius * (0.35 + progress * 0.65);
          const spark = document.createElement("i");
          Object.assign(spark.style, {
            position: "absolute", left: `${burst.x}px`, top: `${burst.y}px`, width: `${sparkSize}px`, height: `${sparkWidth}px`,
            borderRadius: "999px", background: sparkColor, transformOrigin: "0 50%",
            transform: `rotate(${angle}rad) translateX(${distance}px) scaleX(${1 - progress})`, opacity: `${1 - progress}`,
          });
          layer.appendChild(spark);
        }
        root.appendChild(layer);
      });
      if (burstsRef.current.length) requestAnimationFrame(draw);
    };
    root.addEventListener("pointerdown", onPointerDown);
    return () => root.removeEventListener("pointerdown", onPointerDown);
  }, [duration, reduceMotionKey(sparkColor, sparkCount, sparkRadius, sparkSize, sparkWidth)]);

  return <div ref={rootRef} className={`relative ${className}`.trim()}>{children}</div>;
};

const reduceMotionKey = (...values) => values.join("|");

export default ClickSpark;

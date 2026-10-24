import { useEffect, useRef } from "react";
import "./hexagonal-vault.css";

const HEX_SIZE = 42;

function rgba(hex, alpha) {
  const value = hex.replace("#", "");
  const normalized = value.length === 3 ? value.split("").map((digit) => digit + digit).join("") : value;
  const number = Number.parseInt(normalized, 16);
  return `rgba(${(number >> 16) & 255}, ${(number >> 8) & 255}, ${number & 255}, ${alpha})`;
}

function drawHexagon(context, x, y, radius) {
  context.beginPath();
  for (let side = 0; side < 6; side += 1) {
    const angle = (Math.PI / 3) * side + Math.PI / 6;
    const pointX = x + radius * Math.cos(angle);
    const pointY = y + radius * Math.sin(angle);

    if (side === 0) context.moveTo(pointX, pointY);
    else context.lineTo(pointX, pointY);
  }
  context.closePath();
}

export function HexagonalVault() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext("2d");
    if (!context) return undefined;

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const light = { x: pointer.x, y: pointer.y };
    let frameId;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const updatePointer = (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    };

    const render = (time) => {
      light.x += (pointer.x - light.x) * 0.08;
      light.y += (pointer.y - light.y) * 0.08;

      context.clearRect(0, 0, width, height);
      const styles = getComputedStyle(canvas);
      const background = styles.getPropertyValue("--color-background").trim() || "#140021";
      const glowColor = styles.getPropertyValue("--color-highlight").trim() || "#f03b82";
      const accentColor = styles.getPropertyValue("--color-accent").trim() || "#a30ba9";
      context.fillStyle = background;
      context.fillRect(0, 0, width, height);

      const spacingX = HEX_SIZE * 1.5;
      const spacingY = HEX_SIZE * Math.sqrt(3);
      const drift = (time * 0.004) % spacingY;
      const margin = HEX_SIZE * 2;

      context.lineWidth = 1;
      for (let column = -2; column < width / spacingX + 2; column += 1) {
        const x = column * spacingX;
        const offset = (column & 1) * spacingY / 2;

        for (let row = -2; row < height / spacingY + 3; row += 1) {
          const y = row * spacingY + offset + drift - margin;
          const distance = Math.hypot(x - light.x, y - light.y);
          const influence = Math.max(0, 1 - distance / 300);

          drawHexagon(context, x, y, HEX_SIZE);
          context.strokeStyle = rgba(glowColor, 0.08 + influence * 0.6);
          context.stroke();
        }
      }

      const glow = context.createRadialGradient(
        light.x,
        light.y,
        0,
        light.x,
        light.y,
        280,
      );
      glow.addColorStop(0, rgba(glowColor, 0.18));
      glow.addColorStop(0.35, rgba(accentColor, 0.08));
      glow.addColorStop(1, rgba(background, 0));
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      frameId = window.requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", updatePointer, { passive: true });
    frameId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", updatePointer);
    };
  }, []);

  return <canvas ref={canvasRef} className="hexagonal-vault" aria-hidden="true" />;
}


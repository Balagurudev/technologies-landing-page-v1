"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./dual-wave.css";

const baseProjects = [
  { id: 1, title: "Cyberabad Hub", subtitle: "Hyderabad, India", image: "/img/project_1.png" },
  { id: 2, title: "Namma Metro", subtitle: "Bengaluru, India", image: "/img/project_2.png" },
  { id: 3, title: "Gift City Tower", subtitle: "Gujarat, India", image: "/img/project_3.png" },
  { id: 4, title: "Tata Auto Plant", subtitle: "Pune, India", image: "/img/project_4.png" },
  { id: 5, title: "Bhadla Solar", subtitle: "Rajasthan, India", image: "/img/project_5.png" },
  { id: 6, title: "Ganga Purify", subtitle: "Varanasi, India", image: "/img/project_6.png" },
  { id: 7, title: "Jamnagar Ref", subtitle: "Gujarat, India", image: "/img/project_7.png" },
  { id: 8, title: "Navi Data Hub", subtitle: "Maharashtra, India", image: "/img/project_8.png" },
  { id: 9, title: "Smart Traffic", subtitle: "Indore, India", image: "/img/project_9.png" },
  { id: 10, title: "Delhi Airport", subtitle: "New Delhi, India", image: "/img/project_10.png" }
];

// Duplicate projects to create a dense, long scrolling list exactly like the Codrops demo
const projects = [
  ...baseProjects,
  ...baseProjects.map(p => ({ ...p, id: p.id + 10 })),
  ...baseProjects.map(p => ({ ...p, id: p.id + 20 })),
  ...baseProjects.map(p => ({ ...p, id: p.id + 30 }))
];

export function DualWaveProjects() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const currentImageRef = useRef<string | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const leftColumn = wrapper.querySelector(".wave-column-left") as HTMLElement;
    const rightColumn = wrapper.querySelector(".wave-column-right") as HTMLElement;
    const thumbnail = wrapper.querySelector(".image-thumbnail") as HTMLImageElement;

    if (!leftColumn || !rightColumn || !thumbnail) return;

    const leftTexts = gsap.utils.toArray<HTMLElement>(leftColumn.querySelectorAll(".animated-text"));
    const rightTexts = gsap.utils.toArray<HTMLElement>(rightColumn.querySelectorAll(".animated-text"));

    if (leftTexts.length === 0 || rightTexts.length === 0) return;

    const leftQuickSetters = leftTexts.map((text) =>
      gsap.quickTo(text, "x", { duration: 0.6, ease: "power4.out" })
    );
    const rightQuickSetters = rightTexts.map((text) =>
      gsap.quickTo(text, "x", { duration: 0.6, ease: "power4.out" })
    );

    const waveNumber = 12; // Adjusted to match the Codrops demo (data-wave-number="12")
    const waveSpeed = 1;

    let leftRange = { minX: 0, maxX: 0 };
    let rightRange = { minX: 0, maxX: 0 };

    const calculateRanges = () => {
      const maxLeftTextWidth = Math.max(...leftTexts.map((t) => t.offsetWidth));
      const maxRightTextWidth = Math.max(...rightTexts.map((t) => t.offsetWidth));

      leftRange = { minX: 0, maxX: leftColumn.offsetWidth - maxLeftTextWidth };
      rightRange = { minX: 0, maxX: rightColumn.offsetWidth - maxRightTextWidth };
    };

    const setInitialPositions = (texts: HTMLElement[], range: {minX: number, maxX: number}, multiplier: number) => {
      const rangeSize = range.maxX - range.minX;
      texts.forEach((text, index) => {
        const initialPhase = waveNumber * index - Math.PI / 2;
        const initialWave = Math.sin(initialPhase);
        const initialProgress = (initialWave + 1) / 2;
        const startX = (range.minX + initialProgress * rangeSize) * multiplier;
        gsap.set(text, { x: startX });
      });
    };

    const calculateWavePosition = (index: number, globalProgress: number, minX: number, rangeSize: number) => {
      const phase = waveNumber * index + waveSpeed * globalProgress * Math.PI * 2 - Math.PI / 2;
      const wave = Math.sin(phase);
      const cycleProgress = (wave + 1) / 2;
      return minX + cycleProgress * rangeSize;
    };

    const findClosestToViewportCenter = () => {
      const viewportCenter = window.innerHeight / 2;
      let closestIndex = 0;
      let minDistance = Infinity;

      leftTexts.forEach((text, index) => {
        const rect = text.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const distance = Math.abs(elementCenter - viewportCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });
      return closestIndex;
    };

    const updateThumbnail = (focusedText: HTMLElement) => {
      let newImage = focusedText.dataset.image;

      if (!newImage) {
        const focusedIndex = rightTexts.indexOf(focusedText);
        if (focusedIndex !== -1 && leftTexts[focusedIndex]) {
          newImage = leftTexts[focusedIndex].dataset.image;
        }
      }

      if (newImage && currentImageRef.current !== newImage) {
        currentImageRef.current = newImage;
        thumbnail.src = newImage;
      }

      const wrapperRect = wrapper.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const thumbnailHeight = thumbnail.offsetHeight;
      const wrapperHeight = wrapper.offsetHeight;

      const idealY = viewportCenter - wrapperRect.top - thumbnailHeight / 2;
      const minY = -thumbnailHeight / 2;
      const maxY = wrapperHeight - thumbnailHeight / 2;
      const clampedY = Math.max(minY, Math.min(maxY, idealY));

      gsap.set(thumbnail, { y: clampedY });
    };

    const updateColumn = (texts: HTMLElement[], setters: any[], range: {minX: number, maxX: number}, progress: number, focusedIndex: number, multiplier: number) => {
      const rangeSize = range.maxX - range.minX;
      texts.forEach((text, index) => {
        const finalX = calculateWavePosition(index, progress, range.minX, rangeSize) * multiplier;
        setters[index](finalX);

        if (index === focusedIndex) {
          text.classList.add("focused");
        } else {
          text.classList.remove("focused");
        }
      });
    };

    const handleScroll = (self: ScrollTrigger) => {
      const globalProgress = self.progress;
      const closestIndex = findClosestToViewportCenter();

      updateColumn(leftTexts, leftQuickSetters, leftRange, globalProgress, closestIndex, 1);
      updateColumn(rightTexts, rightQuickSetters, rightRange, globalProgress, closestIndex, -1);

      const focusedText = leftTexts[closestIndex];
      if (focusedText) {
        updateThumbnail(focusedText);
      }
    };

    let scrollTrigger: globalThis.ScrollTrigger | undefined;
    const initTimeout = setTimeout(() => {
      calculateRanges();
      setInitialPositions(leftTexts, leftRange, 1);
      setInitialPositions(rightTexts, rightRange, -1);
      
      scrollTrigger = ScrollTrigger.create({
        trigger: wrapper,
        start: "top bottom",
        end: "bottom top",
        onUpdate: handleScroll,
      });

      // Force an initial update to set correct thumbnail and styles
      handleScroll(scrollTrigger);
    }, 100);

    const resizeHandler = () => {
      calculateRanges();
      if (scrollTrigger) handleScroll(scrollTrigger);
    };
    window.addEventListener("resize", resizeHandler);

    return () => {
      clearTimeout(initTimeout);
      if (scrollTrigger) scrollTrigger.kill();
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <div className="dual-wave-wrapper" ref={wrapperRef} data-wave-number="2" data-wave-speed="1">
      <div className="wave-column wave-column-left">
        {projects.map((p) => (
          <div key={p.id} className="animated-text" data-image={p.image}>
            {p.title}
          </div>
        ))}
      </div>
      
      <div className="image-thumbnail-wrapper">
        <img className="image-thumbnail" src={projects[0].image} alt="Thumbnail" />
      </div>
      
      <div className="wave-column wave-column-right">
        {projects.map((p) => (
          <div key={p.id} className="animated-text">
            {p.subtitle}
          </div>
        ))}
      </div>
    </div>
  );
}

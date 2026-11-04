import React from "react";
import "./Portrait.css";

import { PORTRAIT } from "../config/portrait";

/**
 * <picture> shared by the hero and about sections.
 * Explicit width/height + CSS aspect-ratio reserve the space, so there is no layout shift.
 */
export const ProfilePhoto = ({ sizes, className, priority = false }) => {
    if (!PORTRAIT) return null;
    return (
        <picture>
            {PORTRAIT.webpSrcSet && <source type="image/webp" srcSet={PORTRAIT.webpSrcSet} sizes={sizes} />}
            <img
                src={PORTRAIT.src}
                alt={PORTRAIT.alt}
                width={PORTRAIT.width}
                height={PORTRAIT.height}
                className={className}
                loading={priority ? "eager" : "lazy"}
                fetchPriority={priority ? "high" : undefined}
                decoding="async"
                draggable="false"
            />
        </picture>
    );
};

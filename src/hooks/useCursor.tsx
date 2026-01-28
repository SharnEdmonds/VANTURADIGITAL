"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// ═══════════════════════════════════════════════════════════════
// Cursor Context — Global Cursor State Management
// ═══════════════════════════════════════════════════════════════

export type CursorType = "default" | "view" | "play" | "drag" | "text";

interface CursorContextType {
    cursorType: CursorType;
    setCursorType: (type: CursorType) => void;
    cursorText: string;
    setCursorText: (text: string) => void;
    isHovering: boolean;
    setIsHovering: (hovering: boolean) => void;
}

const CursorContext = createContext<CursorContextType | null>(null);

export function CursorProvider({ children }: { children: ReactNode }) {
    const [cursorType, setCursorType] = useState<CursorType>("default");
    const [cursorText, setCursorText] = useState("");
    const [isHovering, setIsHovering] = useState(false);

    return (
        <CursorContext.Provider
            value={{
                cursorType,
                setCursorType,
                cursorText,
                setCursorText,
                isHovering,
                setIsHovering,
            }}
        >
            {children}
        </CursorContext.Provider>
    );
}

export function useCursor() {
    const context = useContext(CursorContext);
    if (!context) {
        throw new Error("useCursor must be used within a CursorProvider");
    }
    return context;
}

// Helper hook for elements that want to trigger cursor changes
export function useCursorHandlers(type: CursorType, text?: string) {
    const { setCursorType, setCursorText, setIsHovering } = useCursor();

    return {
        onMouseEnter: () => {
            setCursorType(type);
            setIsHovering(true);
            if (text) setCursorText(text);
        },
        onMouseLeave: () => {
            setCursorType("default");
            setIsHovering(false);
            setCursorText("");
        },
    };
}

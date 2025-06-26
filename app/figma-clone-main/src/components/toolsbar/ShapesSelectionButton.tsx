import { useState, useRef, useEffect } from "react";
import { BiPointer } from "react-icons/bi";
import { RiHand } from "react-icons/ri";
import { CanvasMode, CanvasState, LayerType } from "~/types";
import IconButton from "./IconButton";
import { IoEllipseOutline, IoSquareOutline } from "react-icons/io5";

export default function ShapesSelectionButton({
  isActive,
  canvasState,
  onClick,
}: {
  isActive: boolean;
  canvasState: CanvasState;
  onClick: (layerType: LayerType.Rectangle | LayerType.Ellipse) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClick = (layerType: LayerType.Rectangle | LayerType.Ellipse) => {
    onClick(layerType);
    setIsOpen(false);
  };

  return (
    <div className="relative flex" ref={menuRef}>
      <IconButton
        isActive={isActive}
        onClick={() => onClick(LayerType.Rectangle)}
      >
        {canvasState.mode !== CanvasMode.Inserting && (
          <IoSquareOutline className="h-5 w-5" />
        )}
        {canvasState.mode === CanvasMode.Inserting &&
          (canvasState.layerType === LayerType.Rectangle ||
            canvasState.layerType === LayerType.Text) && (
            <IoSquareOutline className="h-5 w-5" />
          )}
        {canvasState.mode === CanvasMode.Inserting &&
          canvasState.layerType === LayerType.Ellipse && (
            <IoEllipseOutline className="h-5 w-5" />
          )}
      </IconButton>
      <button onClick={() => setIsOpen(!isOpen)} className="ml-1 rotate-180">
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
          <path
            d="M3.646 6.354l-3-3 .708-.708L4 5.293l2.646-2.647.708.708-3 3L4 6.707l-.354-.353z"
            fill="currentColor"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute -top-20 mt-1 min-w-[150px] rounded-xl bg-[#1e1e1e] p-2 shadow-lg">
          <button
            className={`flex w-full items-center rounded-md p-1 text-white hover:bg-blue-500 ${canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Rectangle ? "bg-blue-500" : ""}`}
            onClick={() => handleClick(LayerType.Rectangle)}
          >
            <span className="w-5 text-xs">
              {canvasState.mode === CanvasMode.Inserting &&
                canvasState.layerType === LayerType.Rectangle &&
                "✓"}
            </span>
            <IoSquareOutline className="mr-2 h-4 w-4" />
            <span className="text-xs">Rectangle</span>
          </button>
          <button
            className={`flex w-full items-center rounded-md p-1 text-white hover:bg-blue-500 ${canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Ellipse ? "bg-blue-500" : ""}`}
            onClick={() => handleClick(LayerType.Ellipse)}
          >
            <span className="w-5 text-xs">
              {canvasState.mode === CanvasMode.Inserting &&
                canvasState.layerType === LayerType.Ellipse &&
                "✓"}
            </span>
            <IoEllipseOutline className="mr-2 h-4 w-4" />
            <span className="text-xs">Ellipse</span>
          </button>
        </div>
      )}
    </div>
  );
}

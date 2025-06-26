import { CanvasMode, CanvasState, LayerType } from "~/types";
import SelectionButton from "./SelectionButton";
import ShapesSelectionButton from "./ShapesSelectionButton";
import ZoomInButton from "./ZoomInButton";
import ZoomOutButton from "./ZoomOutButton";
import PencilButton from "./PencilButton";
import TextButton from "./TextButton";
import UndoButton from "./UndoButton";
import RedoButton from "./RedoButton";

export default function ToolsBar({
  canvasState,
  setCanvasState,
  zoomIn,
  zoomOut,
  canZoomIn,
  canZoomOut,
  canUndo,
  canRedo,
  undo,
  redo,
}: {
  canvasState: CanvasState;
  setCanvasState: (newState: CanvasState) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  canZoomIn: boolean;
  canZoomOut: boolean;
  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;
}) {
  return (
    <div className="fixed bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center justify-center rounded-lg bg-white p-1 shadow-[0_0_3px_rgba(0,0,0,0.18)]">
      <div className="flex items-center justify-center gap-3">
        <SelectionButton
          isActive={
            canvasState.mode === CanvasMode.None ||
            canvasState.mode === CanvasMode.Translating ||
            canvasState.mode === CanvasMode.SelectionNet ||
            canvasState.mode === CanvasMode.Pressing ||
            canvasState.mode === CanvasMode.Resizing ||
            canvasState.mode === CanvasMode.Dragging
          }
          canvasMode={canvasState.mode}
          onClick={(canvasMode) =>
            setCanvasState(
              canvasMode === CanvasMode.Dragging
                ? { mode: canvasMode, origin: null }
                : { mode: canvasMode },
            )
          }
        />
        <ShapesSelectionButton
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            [LayerType.Rectangle, LayerType.Ellipse].includes(
              canvasState.layerType,
            )
          }
          canvasState={canvasState}
          onClick={(layerType) =>
            setCanvasState({ mode: CanvasMode.Inserting, layerType })
          }
        />
        <PencilButton
          isActive={canvasState.mode === CanvasMode.Pencil}
          onClick={() => setCanvasState({ mode: CanvasMode.Pencil })}
        />
        <TextButton
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Text
          }
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Text,
            })
          }
        />
        <div className="w-[1px] self-stretch bg-black/10" />
        <div className="flex items-center justify-center">
          <UndoButton onClick={undo} disabled={!canUndo} />
          <RedoButton onClick={redo} disabled={!canRedo} />
        </div>
        <div className="w-[1px] self-stretch bg-black/10" />
        <div className="flex items-center justify-center">
          <ZoomInButton onClick={zoomIn} disabled={!canZoomIn} />
          <ZoomOutButton onClick={zoomOut} disabled={!canZoomOut} />
        </div>
      </div>
    </div>
  );
}

import { DraggableProvidedDraggableProps, DroppableProvidedProps } from "react-beautiful-dnd";

export interface DroppableProvied {
  innerRef: (element: HTMLElement | null) => void;
  placeholder: React.ReactNode;
  droppableProps: DroppableProvidedProps;
}

export interface DraggableProvided {
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDraggableProps | null | undefined;
}

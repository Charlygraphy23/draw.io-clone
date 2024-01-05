import { DragEvent, TouchEvent, useCallback } from "react";
import { NodeType } from "../../utils/home";
import Node from "./node";

type Props = {
  data: {
    type: string;
  };
  onDragStart?: React.DragEventHandler<HTMLDivElement>;
  draggable?: boolean;
  inSidebar?: boolean;
  properties?: Record<string, string | number>;
  initialValue?: string;
};

const GHOST_ELEMENT_CLASS = "ghostImages";

const CustomNodes = ({ data, ...rest }: Props) => {
  const { type = NodeType.RECTANGLE } = data;

  const removeGhostImage = (event: DragEvent<HTMLDivElement>) => {
    const img = new Image();
    img.src =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
    event.dataTransfer.setDragImage(img, 0, 0);
  };

  const getClonedNode = (target: Node) => {
    if (target instanceof HTMLElement) {
      return target.cloneNode(true) as HTMLElement;
    }
    return null;
  };

  const ghostElement = (
    event: DragEvent<HTMLElement> | TouchEvent<HTMLElement>,
    isTouchEvent = false
  ) => {
    const element = event?.target;
    let clonedElement: HTMLElement | null = null;

    if (element instanceof HTMLElement && !isTouchEvent) {
      clonedElement = getClonedNode(element) as HTMLElement;

      clonedElement.classList.add(GHOST_ELEMENT_CLASS);
      clonedElement.style.minWidth = `${element.offsetWidth}px`;
    } else if (isTouchEvent) {
      const touchEvent = event as TouchEvent<HTMLElement>;
      const target = event.target as HTMLElement;
      clonedElement = getClonedNode(target) as HTMLElement;

      clonedElement.classList.add(GHOST_ELEMENT_CLASS);

      const [touch] = Array.from(touchEvent.changedTouches);
      clonedElement.style.position = "absolute";
      clonedElement.style.top = `${touch.clientY}px`;
      clonedElement.style.left = `${touch.clientX}px`;
      clonedElement.style.minWidth = `${target.offsetWidth}px`;
    }

    if (!clonedElement) return null;

    document.body.append(clonedElement);
    return clonedElement;
  };

  const onDragStart = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      removeGhostImage(event);
      const element = ghostElement(event);
      if (!element) return;
      console.log(element);

      event.dataTransfer.setData("application/reactflow", data?.type);
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setDragImage(element, 0, 0);
    },
    [data?.type]
  );

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    // const element = ghostElement(event.);
    const element = ghostElement(event, true);
    console.log(element);
  };

  const onDragEnd = () => {
    const element = document.querySelector(`.${GHOST_ELEMENT_CLASS}`);
    if (element) element.remove();
  };

  const onTouchMove = (event: TouchEvent<HTMLElement>) => {
    const [touch] = Array.from(event.changedTouches);
    const element = document.querySelector(`.${GHOST_ELEMENT_CLASS}`);

    if (element && element instanceof HTMLElement) {
      element.style.top = `${touch.clientY}px`;
      element.style.left = `${touch.clientX}px`;
    }
  };

  const onTouchEnd = () => {
    onDragEnd();
  };

  return (
    <div
      onDragStart={onDragStart}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onDragEnd={onDragEnd}
      onTouchEnd={onTouchEnd}
    >
      <Node nodeType={type as NodeType} {...rest} />
    </div>
  );
};

export default CustomNodes;

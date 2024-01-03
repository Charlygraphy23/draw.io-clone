import DownloadIcon from "@mui/icons-material/Download";
import style from "./style.module.scss";
import { Node, getRectOfNodes, getTransformForBounds, useReactFlow } from "reactflow";
import { toPng } from "html-to-image";

const imageWidth = 1024;
const imageHeight = 768;

type Props = {
    nodes : Node<unknown, string | undefined>[]
}

const DownloadComponent = ({ nodes } : Props) => {
  const { getNodes } = useReactFlow();

  function downloadImage(dataUrl: string) {
    const a = document.createElement("a");

    a.setAttribute("download", "reactflow.png");
    a.setAttribute("href", dataUrl);
    a.click();
  }

  const onClick = () => {
    // we calculate a transform for the nodes so that all nodes are visible
    // we then overwrite the transform of the `.react-flow__viewport` element
    // with the style option of the html-to-image library
    const nodesBounds = getRectOfNodes(getNodes());
    const transform = getTransformForBounds(
      nodesBounds,
      imageWidth,
      imageHeight,
      0.5,
      2
    );
    const element = document.querySelector(
      ".react-flow__viewport"
    ) as NonNullable<HTMLElement>;

    toPng(element, {
      backgroundColor: "#e9e7e7",
      width: imageWidth,
      height: imageHeight,
      style: {
        width: String(imageWidth),
        height: String(imageHeight),
        transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
      },
    }).then(downloadImage);
  };

  return (
    <>
      {nodes?.length > 0 && (
        <div className={style?.downloadButton} onClick={onClick}>
          <DownloadIcon />
        </div>
      )}
    </>
  );
};

export default DownloadComponent;

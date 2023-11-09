import { useEffect, useRef } from "react";
import styled from "styled-components";

const Frame = styled("div")`
  border: 1px solid red;
  /* border-radius: 7px; */
  width: 500px;
  height: 250px;
  margin: auto;
  position: relative;
  overflow: hidden;
`;

// TODO: find the way how to adapt div to fit the size of the image (object-fit maybe?)
const Image = styled("div")`
  border: 1px solid blue;
  box-sizing: border-box;
  background-image: url("https://images.unsplash.com/photo-1513530534585-c7b1394c6d51?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG9ubGluZXxlbnwwfHwwfHx8MA%3D%3D");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 299px;
  height: 200px;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
`;

const Text = styled("span")`
  position: absolute;
  top: 20px;
  left: 150px;
`;

// TODO: mouse tracker should be used to move any element which comes as a parameter
// const elementMouseTracker = (
//   element: HTMLElement | null,
//   image: HTMLElement | null
// ) => {
//   if (element && image) {
//     element.onmousemove = (event) => {
//       if (event.buttons === 1) {
//         const x =
//           ((event.pageX - element.offsetLeft) * 100) / element.offsetWidth +
//           "%";
//         const y =
//           ((event.pageY - element.offsetTop) * 100) / element.offsetHeight +
//           "%";
//         console.log("Mouse X:", x, "Mouse Y:", y);
//         // Update the position of the image
//         image.style.left = `${x}`;
//         image.style.top = `${y}`;
//       }
//     };
//   }
// };

const elementMouseTracker = (
  element: HTMLElement | null,
  image: HTMLElement | null
) => {
  if (element && image) {
    let isDragging = false;
    let initialX = 0;
    let initialY = 0;

    element.onmousedown = (event) => {
      isDragging = true;

      // console.log(
      //   "initial",
      //   element.getBoundingClientRect().width / 2,
      //   element.getBoundingClientRect().height / 2
      // );
      initialX = event.clientX - parseFloat(image.style.left || "250");
      initialY = event.clientY - parseFloat(image.style.top || "125");
    };

    element.onmouseup = () => {
      isDragging = false;

      // TODO: think how to get the left and top positions of the image
      const getComputedStyle = () => window.getComputedStyle(image);
      console.log("<style> top:", getComputedStyle().top);
    };

    element.onmousemove = (event) => {
      if (isDragging) {
        const newX = event.clientX - initialX;
        const newY = event.clientY - initialY;

        image.style.left = newX + "px";
        image.style.top = newY + "px";
      }
    };

    element.onmouseout = () => {
      // TODO: Maybe do a click event or kill all events... I'll think
      isDragging = false;
      // TODO: Reset any ongoing transformations here
    };
  }
};

const WYSIWYG: React.FC = () => {
  const frame = useRef(null);
  const image = useRef(null);

  const getComputedStyle = () => window.getComputedStyle(image.current!);

  useEffect(() => {
    console.log(getComputedStyle().top);
  }, [image]);

  useEffect(() => {
    elementMouseTracker(frame.current, image.current);
  }, []);

  return (
    <>
      <Frame ref={frame}>
        <Image ref={image} />
        {/* <Text>Aleksandar Panov</Text> */}
      </Frame>
    </>
  );
};

export default WYSIWYG;

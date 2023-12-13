/** @format */

import { useEffect, useRef, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { imageDimensions } from "../utils/imageDimensions";

interface ImageProps {
	width: number;
	height: number;
	imageUrl?: string;
}

// adding .no-global-styles to a child element in the "frame" will not apply the global-class styles
const GlobalStyles = createGlobalStyle`
  .global-class :not(.no-global-styles) {
    cursor: grab;

    &:active {
      cursor: grabbing;
    }
  }
`;

const Frame = styled("div")`
	border: 1px solid red;
	/* border-radius: 7px; */
	width: 500px;
	height: 250px;
	margin: auto;
	position: relative;
	overflow: hidden;
`;

const IMAGE_URL = "https://placehold.co/150";

// TODO: Enable imageUrl to be passed as a prop
const Image = styled("div")<ImageProps>`
	border: 1px solid blue;
	box-sizing: border-box;
	background-image: url(${IMAGE_URL});
	background-size: contain;
	background-repeat: no-repeat;
	background-position: center;
	width: ${(props) => props.width}px;
	height: ${(props) => props.height}px;
	position: absolute;
	transform: translate(-50%, -50%);
	top: 50%;
	left: 50%;
`;

const Text = styled("span")`
	position: absolute;
	top: 20px;
	left: 150px;
	user-select: none;
`;

const handleElementDrag = (frame: HTMLElement | null) => {
	if (frame) {
		let isDragging = false;
		let initialX = 0;
		let initialY = 0;
		let currentElement: HTMLElement | null = null;

		frame.onmousedown = (event) => {
			const target = event.target as HTMLElement;

			// Check if the clicked element is suitable for dragging
			if (target && target !== frame) {
				isDragging = true;
				currentElement = target;

				// Calculate the initial position relative to the clicked element
				initialX = event.clientX - currentElement.offsetLeft;
				initialY = event.clientY - currentElement.offsetTop;
			}
		};

		// TODO: We will not use this getComputedStyle in this way, it is just for testing purposes. It should go over all elements and get the computed style for each one
		document.onmouseup = () => {
			isDragging = false;

			// capture the dragged element before it is set to null
			const draggedElement = currentElement;

			currentElement = null;

			// this will return the position but with added 50% of the size of the image due to the transform: translate(-50%, -50%) in the styles
			if (draggedElement) {
				const getComputedStyle = () => window.getComputedStyle(draggedElement);
				console.log("<style> top:", getComputedStyle().top);
				console.log("<style> left:", getComputedStyle().left);
			}
		};

		document.onmousemove = (event) => {
			if (isDragging && currentElement) {
				const newX = event.clientX - initialX;
				const newY = event.clientY - initialY;

				// Update the position of the clicked element
				currentElement.style.left = newX + "px";
				currentElement.style.top = newY + "px";
			}
		};

		frame.onmouseout = () => {
			isDragging = false;
			currentElement = null;
		};
	}
};

const WYSIWYG: React.FC = () => {
	const frame = useRef(null);
	const image = useRef(null);
	const [imageDimensionsState, setImageDimensionsState] = useState({
		width: 0,
		height: 0,
	});

	// const getComputedStyle = () => window.getComputedStyle(image.current!);

	// useEffect(() => {
	// 	console.log(getComputedStyle().top);
	// }, [image]);

	useEffect(() => {
		imageDimensions(IMAGE_URL).then((dimensions) => {
			setImageDimensionsState(dimensions);
		});
	}, []);

	useEffect(() => {
		handleElementDrag(frame.current);
	}, []);

	return (
		<>
			<GlobalStyles />
			<Frame
				ref={frame}
				className="global-class"
			>
				<Image
					ref={image}
					width={imageDimensionsState.width}
					height={imageDimensionsState.height}
				/>
				<Text>Aleksandar Panov</Text>
			</Frame>
		</>
	);
};

export default WYSIWYG;

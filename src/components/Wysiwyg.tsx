/** @format */

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { imageDimensions } from "../utils/imageDimensions";

interface ImageProps {
	width: number;
	height: number;
	imageUrl?: string;
}

const Frame = styled("div")`
	border: 1px solid red;
	/* border-radius: 7px; */
	width: 500px;
	height: 250px;
	margin: auto;
	position: relative;
	overflow: hidden;
`;

// ! testing imageDimensions
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
`;

// * This is the first version of the mouse tracker, which is working, but it only moves the image when the mouse is anywhere in the frame
// // TODO: mouse tracker should be used to move any element which comes as a parameter
// const elementMouseTracker = (frame: HTMLElement | null, image: HTMLElement | null) => {
// 	if (frame && image) {
// 		let isDragging = false;
// 		let initialX = 0;
// 		let initialY = 0;

// 		frame.onmousedown = (event) => {
// 			isDragging = true;

// hardcoded values for now, because it is a half of the frame size
// 			initialX = event.clientX - parseFloat(image.style.left || "250");
// 			initialY = event.clientY - parseFloat(image.style.top || "125");
// 		};

// 		frame.onmouseup = () => {
// 			isDragging = false;

// this will return the position but with added 50% of the size of the image due to the transform: translate(-50%, -50%) in the styles
// 			const getComputedStyle = () => window.getComputedStyle(image);
// 			console.log("<style> top:", getComputedStyle().top);
// 			console.log("<style> left:", getComputedStyle().left);
// 		};
// 		frame.onmousemove = (event) => {
// 			if (isDragging) {
// 				const newX = event.clientX - initialX;
// 				const newY = event.clientY - initialY;

// 				image.style.left = newX + "px";
// 				image.style.top = newY + "px";
// 			}
// 		};

// 		frame.onmouseout = () => {
//		// TODO: Maybe do a click event or kill all events... I'll think
// 			isDragging = false;
//    // TODO: Reset any ongoing transformations here
// 		};
// 	}
// };

// * This is the second version of the mouse tracker, which is working, but it only moves the image when the mouse is over the image
// // ! testing this version of moving the image, only when mouse is on the image
// const elementMouseTracker = (frame: HTMLElement | null, image: HTMLElement | null) => {
// 	if (frame && image) {
// 		let isDragging = false;
// 		let initialX = 0;
// 		let initialY = 0;

// 		image.onmousedown = (event) => {
// 			isDragging = true;

// 			// Calculate the initial position relative to the image
// 			initialX = event.clientX - image.offsetLeft;
// 			initialY = event.clientY - image.offsetTop;
// 		};

// 		document.onmouseup = () => {
// 			isDragging = false;

// 			// this will return the position but with added 50% of the size of the image due to the transform: translate(-50%, -50%) in the styles
// 			const getComputedStyle = () => window.getComputedStyle(image);
// 			console.log("<style> top:", getComputedStyle().top);
// 			console.log("<style> left:", getComputedStyle().left);
// 		};

// 		document.onmousemove = (event) => {
// 			if (isDragging) {
// 				const newX = event.clientX - initialX;
// 				const newY = event.clientY - initialY;

// 				// Update the image position
// 				image.style.left = newX + "px";
// 				image.style.top = newY + "px";
// 			}
// 		};

// 		image.onmouseout = () => {
// 			isDragging = false;
// 		};
// 	}
// };

const elementMouseTracker = (frame: HTMLElement | null) => {
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

		document.onmouseup = () => {
			isDragging = false;
			currentElement = null;
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

// TODO: Think where to put this. It was in the onmouseup event, but now "image" doesn't exist there
// this will return the position but with added 50% of the size of the image due to the transform: translate(-50%, -50%) in the styles
// const getComputedStyle = () => window.getComputedStyle(image);
// console.log("<style> top:", getComputedStyle().top);
// console.log("<style> left:", getComputedStyle().left);

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
		// elementMouseTracker(frame.current, image.current);
		elementMouseTracker(frame.current);
	}, []);

	return (
		<>
			<Frame ref={frame}>
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

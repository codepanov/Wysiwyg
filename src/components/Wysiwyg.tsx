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

// const IMAGE_URL =
// 	"https://images.unsplash.com/photo-1513530534585-c7b1394c6d51?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG9ubGluZXxlbnwwfHwwfHx8MA%3D%3D";

// ! testing imageDimensions
const IMAGE_URL = "https://placehold.co/150";

// imageDimensions(IMAGE_URL).then((dimensions) => {
// 	console.log(dimensions.width);
// });

// TODO: Enable imageUrl to be passed as a prop
const Image = styled("div")<ImageProps>`
	border: 1px solid blue;
	box-sizing: border-box;
	background-image: url(${IMAGE_URL});
	background-size: contain;
	background-repeat: no-repeat;
	background-position: center;
	/* width: 299px;
	height: 200px; */
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

// TODO: mouse tracker should be used to move any element which comes as a parameter
const elementMouseTracker = (frame: HTMLElement | null, image: HTMLElement | null) => {
	if (frame && image) {
		let isDragging = false;
		let initialX = 0;
		let initialY = 0;

		frame.onmousedown = (event) => {
			isDragging = true;
			initialX = event.clientX - parseFloat(image.style.left || "250");
			initialY = event.clientY - parseFloat(image.style.top || "125");
		};

		frame.onmouseup = () => {
			isDragging = false;
			const getComputedStyle = () => window.getComputedStyle(image);
			console.log("<style> top:", getComputedStyle().top);
			console.log("<style> left:", getComputedStyle().left);
		};

		frame.onmousemove = (event) => {
			if (isDragging) {
				const newX = event.clientX - initialX;
				const newY = event.clientY - initialY;

				image.style.left = newX + "px";
				image.style.top = newY + "px";
			}
		};

		frame.onmouseout = () => {
			// TODO: Maybe do a click event or kill all events... I'll think
			isDragging = false;
			// TODO: Reset any ongoing transformations here
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

	const getComputedStyle = () => window.getComputedStyle(image.current!);

	// useEffect(() => {
	// 	console.log(getComputedStyle().top);
	// }, [image]);

	useEffect(() => {
		imageDimensions(IMAGE_URL).then((dimensions) => {
			setImageDimensionsState(dimensions);
		});
	}, []);

	useEffect(() => {
		elementMouseTracker(frame.current, image.current);
	}, []);

	return (
		<>
			<Frame ref={frame}>
				<Image
					ref={image}
					width={imageDimensionsState.width}
					height={imageDimensionsState.height}
				/>
				{/* <Text>Aleksandar Panov</Text> */}
			</Frame>
		</>
	);
};

export default WYSIWYG;

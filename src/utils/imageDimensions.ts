/** @format */

export const imageDimensions = (imageUrl: string) => {
	return new Promise<{ width: number; height: number }>((resolve) => {
		const img = new Image() as HTMLImageElement;

		img.onload = () => {
			const dimensions = { width: img.width, height: img.height };
			resolve(dimensions);
		};

		img.src = imageUrl;
	});
};

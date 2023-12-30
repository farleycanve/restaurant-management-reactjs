import { Box, Card, CircularProgress } from '@material-ui/core';
import { FC, useLayoutEffect, useRef, useState } from 'react';

interface CardImageProps {
	size: 'small' | 'medium' | 'large' | 'fullWidth';
	imageBase64: ArrayBuffer | string;
	isGettingImage: boolean;
	setImageSize?: (imageSize: any) => void;
}

const sizeDimensions = {
	small: 120,
	medium: 320,
	large: 640,
	fullWidth: 1080,
};

const CardImage: FC<CardImageProps> = props => {
	const { imageBase64, size, isGettingImage, setImageSize = null } = props;
	const imageRef = useRef<HTMLImageElement>();
	const [isLoading, setIsLoading] = useState(false);

	useLayoutEffect(() => {
		const handleChangeVideoSize = () => {
			const { naturalWidth, naturalHeight } = imageRef.current;

			if (size === 'fullWidth') {
				imageRef.current.style.maxWidth = '100%';
				imageRef.current.style.maxHeight = '';
				setIsLoading(false);
				return;
			}
			if (naturalWidth < sizeDimensions[size] && naturalHeight < sizeDimensions[size]) {
				setIsLoading(false);
				return;
			}
			if (naturalHeight >= naturalWidth) {
				imageRef.current.style.maxHeight = `${sizeDimensions[size]}px`;
				imageRef.current.style.maxWidth = '';
			} else {
				imageRef.current.style.maxWidth = `${sizeDimensions[size]}px`;
				imageRef.current.style.maxHeight = '';
			}
			setIsLoading(false);
		};

		setIsLoading(true);

		const imageElement = imageRef.current;
		imageElement.addEventListener('load', handleChangeVideoSize);

		return () => imageElement.removeEventListener('load', handleChangeVideoSize);
	}, []);

	// Handle get image size that is used in reality website
	useLayoutEffect(() => {
		if (!setImageSize) return;
		const { naturalWidth, naturalHeight } = imageRef.current;
		if (naturalWidth > 0 && naturalHeight > 0) {
			setImageSize(prev => {
				//if already get initial value, just stop
				if (prev.height > 0 || prev.width > 0) return prev;

				//if not, just get the initial
				return { width: naturalWidth, height: naturalHeight };
			});
		}
	}, [imageRef]);

	return (
		<Card sx={{ p: 4 }}>
			<Box
				sx={{
					display: isGettingImage || isLoading ? 'flex' : 'none',
					alignItems: 'center',
					justifyContent: 'center',
					height: '100%',
					minHeight: `${sizeDimensions[size]}px`,
					width: '100%',
				}}
			>
				<CircularProgress />
			</Box>

			<img
				src={(imageBase64 as string) ?? '/static/No-Image-Placeholder.png'}
				alt="eg admin"
				style={{
					display: isGettingImage || isLoading ? 'none' : 'block',
					objectFit: 'contain',
					margin: 'auto',
					borderRadius: '4px',
					width: !imageBase64 ? '320px' : 'auto',
					height: !imageBase64 ? '320px' : 'auto',
				}}
				ref={imageRef}
			/>
		</Card>
	);
};

export default CardImage;

import { Box, Card, CircularProgress } from '@material-ui/core';
import { FC, useLayoutEffect, useRef, useState } from 'react';

interface IconImageProps {
	size?: 'small' | 'medium' | 'large' | 'fullWidth';
	imageBase64: ArrayBuffer | string;
	isGettingImage: boolean;
}

const sizeDimensions = {
	small: 40,
	medium: 120,
	large: 640,
	fullWidth: 1080,
};

const IconImage: FC<IconImageProps> = props => {
	const { imageBase64, size = 'small', isGettingImage } = props;
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

	return (
		<Card
			sx={{
				p: size === 'small' ? '2px 8px' : 4,
				width: 'fit-content',
				borderRadius: size === 'small' ? '4px' : 2,
				boxShadow: size === 'small' ? 'none' : '0px 1px 2pxrgba(0, 0, 0, 0.12),0px 0px 0px 1px rgba(0, 0, 0, 0.05)',
			}}
		>
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
				style={{ display: isGettingImage || isLoading ? 'none' : 'block', objectFit: 'contain', margin: 'auto' }}
				ref={imageRef}
			/>
		</Card>
	);
};

export default IconImage;

import { Box, Card, CircularProgress, makeStyles } from '@material-ui/core';
import { FC, useEffect, useLayoutEffect, useRef, useState } from 'react';

interface BannerImageProps {
	image: any;
	isGettingImage: boolean;
	size: 'small' | 'medium' | 'large' | 'fullWidth';
}

const useStyles = makeStyles(() => ({
	root: {},
}));

const sizeDimensions = {
	small: 120,
	medium: 320,
	large: 640,
	fullWidth: 1080,
};

const BannerImage: FC<BannerImageProps> = props => {
	const { image, isGettingImage, size } = props;
	const [imageURL, setImageURL] = useState('');
	const classes = useStyles();
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

	useEffect(() => {
		setImageURL(() => URL.createObjectURL(image));
	}, [image]);

	useEffect(() => {
		return () => URL.revokeObjectURL(imageURL);
	}, [imageURL]);

	return (
		<Card sx={{ p: 4 }} className={classes.root}>
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
				src={imageURL}
				alt="eg admin"
				style={{
					display: isGettingImage || isLoading ? 'none' : 'block',
					objectFit: 'contain',
					margin: 'auto',
					borderRadius: '4px',
					perspective: '1px',
				}}
				ref={imageRef}
			/>
		</Card>
	);
};

export default BannerImage;

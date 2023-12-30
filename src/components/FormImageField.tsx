import { Box, Button, Grid, Typography } from '@material-ui/core';
import FileDropzone from 'components/FileDropzone';
import { FC, useLayoutEffect, useState } from 'react';
import { toBase64 } from 'utils/toBase64';
import CardImage from './CardImage';

interface FormImageFieldProps {
	fieldName: string;
	image: string;
	initImageBase64: ArrayBuffer | string;
	size: 'small' | 'medium' | 'large' | 'fullWidth';
	isGettingImage: boolean;
	setImage: (image: string) => void;
	isContentImage?: boolean;
}

const FormImageField: FC<FormImageFieldProps> = props => {
	const { fieldName, image, initImageBase64, isContentImage, setImage, size, isGettingImage } = props;
	const handleDropCover = async ([file]: File[]) => {
		const data = (await toBase64(file)) as string;
		setImage(data);
	};
	const [imageSize, setImageSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

	const handleRemoveCover = (): void => {
		setImage(null);
	};
	useLayoutEffect(() => {
		if (initImageBase64) {
			setImage(initImageBase64 as string);
		}
	}, [initImageBase64]);

	return (
		<Grid item xs={12}>
			<Typography
				color="textSecondary"
				sx={{
					mt: 3,
				}}
				variant="h6"
			>
				{fieldName}
			</Typography>
			{isContentImage && (
				<Typography
					color="secondary.main"
					sx={{
						mb: 2,
					}}
					variant="h6"
				>
					(*) The new image must has the same size of the previous one - {imageSize?.width} x {imageSize?.height}, just
					change the text inside
				</Typography>
			)}
			{image ? (
				<div>
					<CardImage
						size={size}
						setImageSize={setImageSize}
						imageBase64={image as string}
						isGettingImage={isGettingImage}
					/>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'flex-end',
							mt: 2,
						}}
					>
						<Button color="primary" onClick={handleRemoveCover} variant="text">
							Change {fieldName}
						</Button>
					</Box>
				</div>
			) : (
				<FileDropzone accept="image/*" maxFiles={1} onDrop={handleDropCover} />
			)}
		</Grid>
	);
};

export default FormImageField;

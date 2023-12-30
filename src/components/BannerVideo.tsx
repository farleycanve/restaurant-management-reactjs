import { Box, Card, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import VideoPlayer from 'components/VideoPlayer';
import { FC, useEffect, useState } from 'react';

interface BannerVideoProps {
	videoFile: any;
	isGettingVideo: boolean;
}

const useStyles = makeStyles(() => ({
	root: {},
}));

const BannerVideo: FC<BannerVideoProps> = props => {
	const { videoFile, isGettingVideo } = props;
	const classes = useStyles();
	const [videoURL, setVideoURL] = useState('');
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		setVideoURL(() => URL.createObjectURL(videoFile));
	}, [videoFile]);

	useEffect(() => {
		return () => URL.revokeObjectURL(videoURL);
	}, [videoURL]);

	return (
		<Card sx={{ p: 4 }} className={classes.root}>
			<Box
				sx={{
					display: isGettingVideo || loading ? 'flex' : 'none',
					alignItems: 'center',
					justifyContent: 'center',
					minHeight: '640px',
					height: '100%',
					width: '100%',
				}}
			>
				<CircularProgress />
			</Box>
			<Box
				sx={{
					display: isGettingVideo || loading ? 'none' : '',
					borderRadius: '4px',
					perspective: '1px',
				}}
			>
				<VideoPlayer autoPlay={false} videoSource={videoURL} onCanPlay={() => setLoading(false)} />
			</Box>
		</Card>
	);
};

export default BannerVideo;

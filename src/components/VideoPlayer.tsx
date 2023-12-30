import React, { useEffect, useRef } from 'react';
import 'video-react/dist/video-react.css';

import { ControlBar, PlaybackRateMenuButton, Player, PlayToggle, VolumeMenuButton } from 'video-react';

const VideoPlayer = props => {
	const { videoSource, autoPlay, onCanPlay = null } = props;
	const videoRef = useRef<any>();

	useEffect(() => {
		if (videoSource && videoRef) {
			videoRef.current.load();
		}
	}, [videoSource]);

	return (
		<Player
			ref={videoRef}
			autoPlay={autoPlay}
			onCanPlay={() => {
				if (onCanPlay) onCanPlay();
			}}
		>
			<source src={videoSource} type="video/mp4" />
			<ControlBar autoHide>
				<PlayToggle />
				<VolumeMenuButton vertical />
				<PlaybackRateMenuButton rates={[2, 1.5, 1, 0.5]} />
			</ControlBar>
		</Player>
	);
};

export default VideoPlayer;

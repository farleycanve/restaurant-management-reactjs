import { Box, IconButton, ListItemIcon, ListItemText, MenuItem, Popover, Typography } from '@material-ui/core';
import { FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { configLanguage } from 'utils/config';

const languages = {
	en: {
		icon: '/locales/en/en.svg',
		label: 'English',
	},
	vi: {
		icon: '/locales/vi/vi.svg',
		label: 'Tiếng Việt',
	},
};

const LanguagePopover: FC = () => {
	const anchorRef = useRef<HTMLButtonElement | null>(null);
	const { i18n } = useTranslation();
	const [open, setOpen] = useState<boolean>(false);
	const [language, setLanguage] = useState('en');

	const handleOpen = (): void => {
		setOpen(true);
	};

	const handleClose = (): void => {
		setOpen(false);
	};

	const handleChangeLanguage = (lang: string): void => {
		setLanguage(lang);
		configLanguage.set(lang);
		setOpen(false);
	};

	useEffect(() => {
		let storageLanguage = configLanguage.get();
		if (storageLanguage) {
			setLanguage(storageLanguage);
			i18n.changeLanguage(storageLanguage);
		}
	}, [language]);

	return (
		<>
			<IconButton onClick={handleOpen} ref={anchorRef}>
				<Box
					sx={{
						display: 'flex',
						height: 20,
						width: 20,
						'& img': {
							width: '100%',
						},
					}}
				>
					<Typography color="textPrimary" variant="subtitle2">
						<img alt={languages[language].label} src={languages[language].icon} />
					</Typography>
				</Box>
			</IconButton>
			<Popover
				anchorEl={anchorRef.current}
				anchorOrigin={{
					horizontal: 'center',
					vertical: 'bottom',
				}}
				keepMounted
				onClose={handleClose}
				open={open}
				PaperProps={{
					sx: { width: 240 },
				}}
			>
				{Object.keys(languages).map(lng => (
					<MenuItem onClick={() => handleChangeLanguage(lng)} key={lng}>
						<ListItemIcon>
							<Box
								sx={{
									display: 'flex',
									height: 20,
									width: 20,
									'& img': {
										width: '100%',
									},
								}}
							>
								<img alt={languages[lng].label} src={languages[lng].icon} />
							</Box>
						</ListItemIcon>
						<ListItemText
							primary={
								<Typography color="textPrimary" variant="subtitle2">
									{languages[lng].label}
								</Typography>
							}
						/>
					</MenuItem>
				))}
			</Popover>
		</>
	);
};

export default LanguagePopover;

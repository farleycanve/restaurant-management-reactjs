import { Box, Card, CardContent, Container, Divider, Typography } from '@material-ui/core';
import gtm from 'lib/gtm';
import { FC, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import FormLogin from './Form';

const Login: FC = () => {
	useEffect(() => {
		gtm.push({ event: 'page_view' });
	}, []);

	return (
		<>
			<Helmet>
				<title>Login | Interview</title>
			</Helmet>
			<Box
				sx={{
					backgroundColor: 'background.default',
					display: 'flex',
					flexDirection: 'column',
					minHeight: '100vh',
				}}
			>
				<Container maxWidth="sm" sx={{ py: '80px' }}>
					<Card>
						<CardContent
							sx={{
								display: 'flex',
								flexDirection: 'column',
								p: 4,
							}}
						>
							<Box
								sx={{
									alignItems: 'center',
									display: 'flex',
									justifyContent: 'space-between',
									mb: 3,
								}}
							>
								<div>
									<Typography color="textPrimary" gutterBottom variant="h4">
										Log in
									</Typography>
									<Typography color="textSecondary" variant="body2">
										Log in on the internal platform
									</Typography>
								</div>
							</Box>
							<Box
								sx={{
									flexGrow: 1,
									mt: 3,
								}}
							>
								<FormLogin />
							</Box>
							<Divider sx={{ my: 3 }} />
						</CardContent>
					</Card>
				</Container>
			</Box>
		</>
	);
};

export default Login;

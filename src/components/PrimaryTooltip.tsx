import styled from '@emotion/styled';
import { Box, Tooltip, tooltipClasses, TooltipProps } from '@material-ui/core';

const PrimaryTooltip = styled(({ className, ref, children, ...props }: TooltipProps) => (
	<Tooltip {...props} classes={{ popper: className }}>
		<Box>{children}</Box>
	</Tooltip>
))(({ theme }) => ({
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: 'rgba(10, 90, 191, 0.24)',
	},
}));

export default PrimaryTooltip;

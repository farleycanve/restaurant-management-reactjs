import { Box, Grid } from '@material-ui/core';
import ExclamationCircle from 'assets/icons/ExclamationCircle';
import React, { FC } from 'react';

interface ToastWarningProps {
    message: string;
}

const ToastWarning: FC<ToastWarningProps> = (props) => {
    const { message } = props;
    return (
        <Grid container alignItems="center">
            <Box display="flex" color="#ffea00" alignItems="center">
                <ExclamationCircle />
            </Box>
            &nbsp;{message}
        </Grid>
    );
};

export default ToastWarning;

import { useEffect } from 'react';
import type { FC } from 'react';
import NProgress from 'nprogress';
import { Box } from '@material-ui/core';

const LoadingScreen: FC = () => {
    useEffect(() => {
        NProgress.start();

        return (): void => {
            NProgress.done();
        };
    }, []);

    return (
        <Box
            sx={{
                backgroundColor: 'background.paper',
                minHeight: '100%',
            }}
        />
    );
};

export default LoadingScreen;

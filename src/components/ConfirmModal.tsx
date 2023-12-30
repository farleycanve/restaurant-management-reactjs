import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, Typography } from '@material-ui/core';
import { alpha } from '@material-ui/core/styles';
import WarningIcon from '@material-ui/icons/WarningOutlined';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import type { FC } from 'react';

interface ConfirmModalProp {
    title: string | '';
    content: string | '';
    open: boolean;
    type?: string | 'warning' | 'success' | 'error';
    onConfirm: () => void;
    onClose: () => void;
}

const ConfirmModal: FC<ConfirmModalProp> = (props) => {
    const { open, onClose, onConfirm, title, content, type = 'warning', ...other } = props;
    return (
        <Dialog open={open} onClose={onClose} {...other}>
            <DialogContent>
                <Box sx={{ display: 'flex' }}>
                    <Avatar
                        sx={{
                            backgroundColor: (theme) => alpha(theme.palette.error.main, 0.08),
                            color: `${type}.main`,
                            mr: 2,
                        }}
                    >
                        {type === 'error' && <ErrorOutlineIcon />}
                        {type === 'warning' && <WarningIcon />}
                        {type === 'success' && <HelpOutlineIcon />}
                    </Avatar>
                    <Box>
                        <Typography color="textPrimary" variant="h5">
                            {title}
                        </Typography>
                        <Typography color="textSecondary" sx={{ mt: 1 }} variant="body2">
                            {content}
                        </Typography>
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
                <Button color="primary" sx={{ mr: 1 }} variant="outlined" onClick={onClose}>
                    No
                </Button>
                <Button
                    sx={{ backgroundColor: 'error.main', '&:hover': { backgroundColor: 'error.dark' } }}
                    variant="contained"
                    onClick={onConfirm}
                >
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmModal;

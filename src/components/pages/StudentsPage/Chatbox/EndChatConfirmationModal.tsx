import { Box, Button, Typography } from '@mui/material';

import BasicModal from '@components/shared/Modal';

interface EndChatConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function EndChatConfirmationModal({
  open,
  onClose,
  onConfirm,
}: EndChatConfirmationModalProps): JSX.Element {
  return (
    <BasicModal open={open} onClose={onClose}>
      <Typography sx={{ mb: 3 }}>
        Are you sure you want to end this chat?
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button variant='outlined' color='primary' onClick={onClose}>
          Cancel
        </Button>
        <Button variant='contained' color='error' onClick={onConfirm}>
          End chat
        </Button>
      </Box>
    </BasicModal>
  );
}

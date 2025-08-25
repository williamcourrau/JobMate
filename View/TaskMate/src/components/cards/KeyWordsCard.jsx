import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


export function KeyWordsCard() {
    const [keyWords, setKeyWords] = useState([]);
    const [open, setOpen] = useState(false);
    const [newKeyword, setNewKeyword] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setNewKeyword('');
    };

    const handleAddKeyword = () => {
        if (newKeyword.trim() !== '' && !keyWords.includes(newKeyword.trim())) {
            setKeyWords([...keyWords, newKeyword.trim()]);
            setNewKeyword('');
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleAddKeyword();
        }
    };

    const handleSave = () => {
        handleAddKeyword();
        handleClose();
    };

    return(
        <Card sx={{ p: 3, borderRadius: 2, width: '100%'}}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant='h6'>Key Words</Typography>  
               <IconButton size="small">
                    <MoreVertIcon />
                </IconButton>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Frequently used keywords in your job applications
            </Typography>

            <Box sx={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                gap: 1,
                mt: 2 }}>
                {keyWords.map((keyword, index) => (
                    <Box 
                        key={index} 
                        sx={{ 
                            p: 1, 
                            bgcolor: '#E0E0E0', 
                            borderRadius: 10, 
                            textAlign: 'center' 
                        }}>
                        <Typography variant="body2">{keyword}</Typography>
                    </Box>
                ))}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <button
          onClick={handleClickOpen}
          style={{
            backgroundColor: 'black',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 16px',
            fontSize: '14px',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          Add Keywords
        </button>
      </Box>

      {/* Add Keyword Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Keyword</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Keyword"
            fullWidth
            variant="outlined"
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: 'text.secondary' }}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={!newKeyword.trim()}
            sx={{ 
              bgcolor: 'black', 
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.8)'
              },
              '&.Mui-disabled': {
                bgcolor: 'rgba(0, 0, 0, 0.3)',
                color: 'white'
              }
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
        </Card>
    );
}
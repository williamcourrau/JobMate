import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

export function InsightCard({ title, number = "0", icon, percentage = 0 }) {
    return (
        <Card
            sx={{
                p: 2.5,
                borderRadius: 2,
                bgcolor: 'background.paper',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                minWidth: 429
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box 
                        sx={{ 
                            width: 100, 
                            height: 100, 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            position: 'relative',
                            borderRadius: 1.5,
                            bgcolor: 'rgba(250, 187, 24, 0.1)', // FABB18 with 10% opacity
                            overflow: 'hidden'
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                width: '100%',
                                height: `${percentage}%`,
                                bgcolor: 'rgba(255, 255, 255, 0.3)',
                                transition: 'height 0.3s ease-in-out'
                            }}
                        />
                        {icon}
                    </Box>
                    <Box>
                        <Typography color="text.secondary" variant="body2" sx={{ mb: 0.5 }}>
                            {title}
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {number}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Card>
    );
}
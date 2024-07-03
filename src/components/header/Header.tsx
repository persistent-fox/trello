import AppBar from '@mui/material/AppBar/AppBar';
import IconButton from '@mui/material/IconButton/IconButton';
import Toolbar from '@mui/material/Toolbar/Toolbar';
import Typography from '@mui/material/Typography/Typography';
import MenuIcon from '@mui/icons-material/Menu';

export const Header = () => {
	return (
		<AppBar position='static'>
			<Toolbar variant='dense'>
				<IconButton edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
					<MenuIcon />
				</IconButton>
				<Typography variant='h6' color='inherit' component='div'>
					Todos
				</Typography>
			</Toolbar>
		</AppBar>
	);
};

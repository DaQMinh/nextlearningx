'use client'
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { DrawerHeader,AppBar ,drawerWidth} from '@/app/learning/sidebarcomponent'
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';


export default function Video() {
  const theme = useTheme();
  const [playingurl, setPlayingUrl] = React.useState<string | null>(null);
  const [open, setOpen] = React.useState(false);
  const drawer = (
    <>
      <Toolbar />
      <List>
        {[
          "All mail",
          "Trash",
          "Spam",
          "Inbox",
          "Starred",
          "Send email",
          "Drafts",
          "Inbox",
          "Starred",
          "Send email",
          "Drafts"
        ].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleVideoPlay = (url: string) => {
    setPlayingUrl(url);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
            <ChevronLeftIcon sx={{ marginLeft: 1, marginRight: 1 }} />
            Learning
             </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
        </AppBar>
    <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` }
        }}
      >
        <DrawerHeader />
        {playingurl && (
          <iframe
            src={`https://www.youtube.com/embed/${playingurl}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </Box>
      <Drawer
            anchor="right"
            variant="temporary"
            open={open}
            sx={{
                display: { xs: "block", sm: "block", md: "none" },
                "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: "100%"
                }
            }}
        >
            {drawer}
        </Drawer>

      <Drawer
        variant="persistent"
        anchor="right"
        sx={{
            display: { xs: "none", sm: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 240
            }
          }}
        open={open}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
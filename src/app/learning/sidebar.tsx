'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { DrawerHeader,AppBar,drawerWidth} from './sidebarcomponent';
import { usePathname } from 'next/navigation'
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
import Link from 'next/link';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface Prop {
  data: any;
  children : React.ReactNode
}

export default function Sidebar({ data , children } : Prop) {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(true);
  const [isCollapse, setIsCollapse] = React.useState<boolean[]>(new Array(data.length).fill(true));
  const handleCollapse = (index: number) => {
    const updatedCollapse = [...isCollapse];
    updatedCollapse[index] = !updatedCollapse[index];
    setIsCollapse(updatedCollapse);
  };

  const drawer = (
    <>
      <Toolbar />
      <List>
      {data.map((item : any, index : any) => (
        <ListItem
          key={index}
          disablePadding
          sx={{ display: "block" }}
          onClick={() => handleCollapse(index)}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: isCollapse[index] ? "center" : "initial",
              px: 2.5,
            }}
          >
          
            <ListItemText primary={item.title} />
            <Link href={`${pathname}/${item.title}`}></Link>
            {isCollapse[index] ? <ExpandMore /> : <ExpandLess/>}
          </ListItemButton>
        </ListItem>
      ))}
      </List>
    </>
  );
  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
          <IconButton >
            <Link href='/'>
            <ChevronLeftIcon sx={{ marginLeft: 1, marginRight: 1 }} />
            </Link>
          </IconButton>
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
        {children}
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


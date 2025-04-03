import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';

const drawerWidth = 240;

const Main = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
}));

const BlockPreview = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export function Builder({ builder }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [blocks, setBlocks] = useState([]);

  const handleAddBlock = async (blockType) => {
    try {
      const newBlock = await builder.blockManager.createBlock(blockType);
      setBlocks([...blocks, newBlock]);
    } catch (error) {
      console.error('Error adding block:', error);
    }
  };

  const blockTypes = [
    { type: 'hero', name: 'Hero Section' },
    { type: 'product', name: 'Product Display' },
    { type: 'content', name: 'Content Block' },
    { type: 'collection', name: 'Collection Grid' },
  ];

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            AI Site Builder
          </Typography>
          <Button color="inherit">Preview</Button>
          <Button color="inherit">Publish</Button>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="persistent"
        anchor="left"
        open={isDrawerOpen}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            top: '64px',
            height: 'calc(100% - 64px)',
          },
        }}
      >
        <Box sx={{ overflow: 'auto', p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Add Blocks
          </Typography>
          <Grid container spacing={2}>
            {blockTypes.map((block) => (
              <Grid item xs={12} key={block.type}>
                <BlockPreview onClick={() => handleAddBlock(block.type)}>
                  <AddIcon sx={{ mb: 1 }} />
                  <Typography>{block.name}</Typography>
                </BlockPreview>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Drawer>

      <Main>
        <Toolbar /> {/* Spacer for AppBar */}
        <Box sx={{ p: 3 }}>
          {blocks.length === 0 ? (
            <Paper
              sx={{
                p: 4,
                textAlign: 'center',
                backgroundColor: 'background.paper',
              }}
            >
              <Typography variant="h6" gutterBottom>
                Start Building Your Site
              </Typography>
              <Typography color="text.secondary">
                Add blocks from the sidebar to begin creating your website.
              </Typography>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {blocks.map((block) => (
                <Grid item xs={12} key={block.id}>
                  <Paper
                    sx={{
                      p: 3,
                      minHeight: '200px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography>{block.type} Block</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Main>
    </Box>
  );
}
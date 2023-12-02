// components/AddArticlePage.js

import React, { useState } from 'react';
import { styled } from '@mui/system';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Select,
    MenuItem,
    Button,
} from '@mui/material';
import axios from 'axios';
import {useRouter} from "next/router";

const AddArticleContainer = styled(Container)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
});

const AddArticleForm = styled('form')({
    width: '50%',
    minWidth: '300px',
    display: 'flex',
    flexDirection: 'column',
});

const AddArticleButton = styled(Button)({
    marginTop: '20px',
});

const AddArticlePage = () => {
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const router = useRouter();
    const handleAddArticle = async () => {
        try {
            const response = await axios.post('http://localhost:8080/post/create', {
                category,
                title,
                text: content,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });

            await router.push('/articles');

            console.log('Article added successfully:', response.data);
            // Дополнительные действия при успешном добавлении статьи, например, перенаправление на страницу со статьями
        } catch (error) {
            console.error('Error adding article:', error.message);
        }
    };

    return (
        <AddArticleContainer>
            <Paper elevation={3} style={{ padding: '20px', width: '100%' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Add New Article
                </Typography>
                <AddArticleForm>
                    <Select
                        label="Category"
                        variant="outlined"
                        fullWidth
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        style={{ marginBottom: '16px' }}
                    >
                        <MenuItem value="category1">Category 1</MenuItem>
                        <MenuItem value="category2">Category 2</MenuItem>
                        <MenuItem value="category3">Category 3</MenuItem>
                    </Select>
                    <TextField
                        label="Title"
                        variant="outlined"
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ marginBottom: '16px' }}
                    />
                    <TextField
                        label="Article Content"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={10}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        style={{ marginBottom: '16px' }}
                    />
                    <AddArticleButton
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleAddArticle}
                    >
                        Add Article
                    </AddArticleButton>
                </AddArticleForm>
            </Paper>
        </AddArticleContainer>
    );
};

export default AddArticlePage;

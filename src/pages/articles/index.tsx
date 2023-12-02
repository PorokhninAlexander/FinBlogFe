// components/ArticlePage.js

import React from 'react';
import { styled } from '@mui/system';
import {
    Container,
    Grid,
    Paper,
    Typography,
    Button,
} from '@mui/material';
import ArticleList from "@/components/articels-list.component";
import { useRouter } from 'next/router';

const TopicBlock = styled(Paper)({
    padding: '16px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    width: '150px'
});

const WriteArticleButton = styled(Button)({
    backgroundColor: '#0070f3',
    color: 'white',
    padding: '12px',
    borderRadius: '4px',
    cursor: 'pointer',
});

const ArticleListBlock = styled(Paper)({
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    maxHeight: '100vh',
    // overflowY: 'auto',
});

const ArticlePage = () => {
    const router = useRouter();
    const onClickCreate = async () => {
        await router.push('/add-article');
    }
    return (
        <Container>
            <Grid container spacing={3}>
                {/* Блок с темами статей (каталог) */}
                <Grid item xs={3}>
                    <TopicBlock>
                        <Typography variant="h6">Topics</Typography>
                        {/* Здесь вы можете добавить список тем */}
                    </TopicBlock>
                </Grid>

                <Grid item xs={9}>
                    {/* Блок с логотипом и кнопкой для написания статьи */}
                    <Grid container alignItems="center" justifyContent="space-between" mb={2}>
                        <Grid item>
                            <img src="/logo.png" alt="Logo" style={{ width: '50px', height: '50px' }} />
                        </Grid>
                        <Grid item>
                            <WriteArticleButton variant="contained" onClick={onClickCreate}>
                                Write Article
                            </WriteArticleButton>
                        </Grid>
                    </Grid>

                    {/* Блок со списком статей */}
                    <ArticleListBlock>
                        <ArticleList />
                    </ArticleListBlock>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ArticlePage;

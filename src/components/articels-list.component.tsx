// components/ArticleList.js

import { FaUser, FaCalendarAlt } from 'react-icons/fa';
import {useEffect, useState} from "react";
import axios from "axios";

interface IArticle {
    id: number;
    title: string;
    text: string;
    createdAt: string;
    user: {
        photoUrl?: string;
        firstName: string;
        lastName: string;
    }
}

const ArticleList = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token'); // Получаем токен из localStorage

        // Загрузка данных при монтировании компонента
        const fetchArticles = async () => {
            try {
                const response = await axios.get('http://localhost:8080/post',{
                    headers: {
                        Authorization: `Bearer ${token}`, // Добавляем токен в заголовок запроса
                    },
                });
                setArticles(response.data);
            } catch (error) {
                // @ts-ignore
                console.error('Error fetching articles:', error.message);
            }
        };

        fetchArticles();
    }, []);

    return (
        <div className="article-list">
            {articles.map((article: IArticle) => (
                    <div className="article" key={article.id}>
                <img
                    src={article.user.photoUrl || 'https://example.com/default-avatar.jpg'} // URL дефолтной аватарки
                alt={`${article.user.lastName}'s avatar`}
    className="author-photo"
    />
    <div className="article-info">
        <h2>{article.title}</h2>
        <div className="author">
        <FaUser /> {article.user.firstName} {article.user.lastName}
    </div>
    <div className="content">{article.text.slice(0, 200)}...</div>
    <div className="date">
        <FaCalendarAlt /> {new Date(article.createdAt).toLocaleDateString()}
        </div>
        <button className="read-more">Read More</button>
    </div>
    </div>
))}

    <style jsx>{`
        .article-list {
          max-width: 800px;
          margin: 0 auto;
        }

        .article {
          border: 1px solid #ddd;
          border-radius: 8px;
          margin-bottom: 20px;
          padding: 20px;
          display: flex;
          align-items: center;
        }

        .author-photo {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-right: 20px;
        }

        .article-info {
          flex-grow: 1;
        }

        h2 {
          margin-bottom: 10px;
        }

        .author {
          color: #555;
          margin-bottom: 10px;
        }

        .content {
          margin-bottom: 15px;
        }

        .date {
          color: #777;
          margin-bottom: 15px;
        }

        .read-more {
          background-color: #0070f3;
          color: white;
          padding: 10px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
      `}</style>
    </div>
);
};

export default ArticleList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './PostForm.css';  // Не забудьте добавить стили для центрации
const apiUrl = process.env.REACT_APP_API_URL;

const PostForm = () => {
    const { id } = useParams(); // Получаем id из URL
    const [post, setPost] = useState({ message: '', media: '' });
    const [isEdit, setIsEdit] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            setIsEdit(true);
            axios
                .get(`${apiUrl}/api/posts/posts/${id}`)
                .then((response) => {
                    setPost(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching post for editing:', error);
                });
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (isEdit) {
            axios
                .put(`${apiUrl}/api/posts/posts/${id}`, post, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then(() => {
                    alert('Пост отредактирован');
                    navigate('/posts');
                })
                .catch((error) => {
                    console.error('Error updating post:', error);
                });
        } else {
            axios
                .post(`${apiUrl}/api/posts/posts`, post, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then(() => {
                    alert('Пост добавлен');
                    navigate('/posts');
                })
                .catch((error) => {
                    console.error('Error adding post:', error);
                });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost((prev) => ({ ...prev, [name]: value }));
    };

    const handleBack = () => {
        navigate('/posts'); // Переход обратно к списку постов
    };

    return (
        <div className="post-form-container">
            <h2>{isEdit ? 'Редактировать пост' : 'Добавить пост'}</h2>
            <form onSubmit={handleSubmit} className="post-form">
                <div className="input-group">
                    <label htmlFor="message">Сообщение</label>
                    <textarea
                        id="message"
                        name="message"
                        value={post.message}
                        onChange={handleChange}
                        required
                        className="input-field"
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="media">Медиа описание</label>
                    <textarea
                        id="media"
                        name="media"
                        value={post.media}
                        onChange={handleChange}
                        required
                        className="input-field"
                    />
                </div>
                <div className="button-group">
                    <button type="submit" className="submit-btn">
                        {isEdit ? 'Сохранить изменения' : 'Добавить пост'}
                    </button>
                    <button type="button" className="back-btn" onClick={handleBack}>
                        Назад к списку
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PostForm;

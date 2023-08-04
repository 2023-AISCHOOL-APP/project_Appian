import React, { useState } from 'react';

const Cone = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);

  const handleAddPost = () => {
    if (title.trim() !== '' && content.trim() !== '') {
      const newPost = { id: Date.now(), title, content };
      setPosts([...posts, newPost]);
      setTitle('');
      setContent('');
    }
  };

  return (
    <div>
      <h1 className='conetitle'>텃밭 자랑하기</h1>
      <div className='ctextbox'>
        제목 : <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <div>^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^</div>
        <textarea
          rows="20"
          cols="100"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        >
          그대의 텃밭을 자랑해보시오
        </textarea>
        <div>
        <button onClick={handleAddPost}>글 작성</button>
        </div>
      </div>
      <div className='post-list'>
        <h2 className='ctexttitle'>게시판</h2>
        <ul className='ctext'>
          {posts.map((post) => (
            <li key={post.id}>
              <strong className='ctexta'>{post.title}</strong>
              <p className='ctexta'>{post.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Cone;
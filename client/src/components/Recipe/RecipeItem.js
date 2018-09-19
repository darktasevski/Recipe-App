import React from 'react';
import { Link } from 'react-router-dom';

const RecipeItem = ({ id, name, category, likes, showLikes }) => (
	<li>
		<Link to={`/recipe/${id}`}>
			<h4>{name}</h4>
		</Link>
		{showLikes && <small>Likes: {likes}</small>}
		<p>
			<strong>{category}</strong>
		</p>
	</li>
);

export default RecipeItem;

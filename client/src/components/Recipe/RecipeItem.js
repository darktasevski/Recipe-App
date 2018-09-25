import React from 'react';
import { Link } from 'react-router-dom';
import posed from 'react-pose';

const RecipeItem = posed.li({
	visible: {
		opacity: 1,
	},
	hidden: {
		opacity: 0,
	},
});

export default ({ id, name, imageUrl, category, likes, showLikes }) => (
	<RecipeItem
		style={{ background: `center / cover no-repeat url(${imageUrl})` }}
		className="card"
	>
		<span className={category}>{category}</span>
		<div className="card-text">
			<Link to={`/recipe/${id}`}>
				<h4>{name}</h4>
			</Link>
			{showLikes && <small>Likes: {likes}</small>}
		</div>
	</RecipeItem>
);

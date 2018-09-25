import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';

import { GET_RECIPE } from '../../queries/index';
import LikeRecipe from './LikeRecipe';
import Spinner from '../Spinner';

const RecipePage = ({
	match: {
		params: { id },
	},
}) => {
	return (
		<Query query={GET_RECIPE} variables={{ id }}>
			{({ data, loading, error }) => {
				if (loading) return <Spinner />;
				if (error) return <div>{error}</div>;
				const { getRecipe } = data;
				return (
					<div>
						<div
							style={{
								background: `url(${
									getRecipe.imageUrl
								}) center center / cover no-repeat`,
							}}
							className="recipe-image"
						/>

						<div className="recipe">
							<div className="recipe-header">
								<h2 className="recipe-name">
									<strong>{getRecipe.name}</strong>
								</h2>
								<h5>
									<strong>{getRecipe.category}</strong>
								</h5>
								<p>
									Created by <strong>{getRecipe.username}</strong>
								</p>
								<p>
									{getRecipe.likes}{' '}
									<span role="img" aria-label="heart">
										❤️
									</span>
								</p>
							</div>
							<blockquote className="recipe-description">
								{getRecipe.description}
							</blockquote>
							<h3 className="recipe-instructions__title">Instructions</h3>
							<div
								className="recipe-instructions"
								dangerouslySetInnerHTML={{
									__html: getRecipe.instructions,
								}}
							/>
							<LikeRecipe _id={id} />
						</div>
					</div>
				);
			}}
		</Query>
	);
};

export default withRouter(RecipePage);

/** @format */

import React from 'react';
import styled from 'styled-components';
import { IconContext } from 'react-icons';
import { GoMarkGithub } from 'react-icons/go';
import { respondTo } from 'styles/mixins';

const Navbar = styled.nav`
	padding: 0.5em 1.5rem;
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(8px);
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-radius: 30px;
	width: 90%;
	margin: auto;
	margin-top: 1rem;
	border: 1px solid rgba(255, 255, 255, 0.18);
	box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);

	${respondTo.xs`
		width: 400px;
	`}
	${respondTo.sm`
		width: 450px;
	`}

	${respondTo.lg`
		margin-top: 1.5rem;
		width: 700px;
		padding: 0.8rem 2rem;
	`}
`;

const Title = styled.h1`
	font-size: 1rem;
	font-weight: var(--medium);
	color: rgba(255, 255, 255, 0.9);

	${respondTo.lg`
		font-size: 1.2rem;
	`}
`;

const index = () => {
	return (
		<>
			<Navbar>
				<Title>Search anime by image</Title>
				<a
					href="https://github.com/YoussefLehroudd?tab=repositories"
					target="_blank"
					rel="noreferrer"
					aria-label="Github link">
					<IconContext.Provider value={{ size: '1.4rem', color: 'rgba(255, 255, 255, 0.9)' }}>
						<GoMarkGithub />
					</IconContext.Provider>
				</a>
			</Navbar>
		</>
	);
};

export default index;

/** @format */

import styled from 'styled-components';
import { respondTo } from '../../styles/mixins';

export const Container = styled.div`
	width: 88%;
	height: 310px;
	padding: 1.3rem;
	padding-bottom: 0.5rem;
	margin: 1.5em auto;
	text-align: center;
	background: rgba(255, 255, 255, 0.05);
	backdrop-filter: blur(8px);
	box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
	border: 1px solid rgba(255, 255, 255, 0.1);
	border-radius: 30px;

	& p {
		font-weight: 600;
		font-size: 0.8rem;
		margin-top: 1rem;
		letter-spacing: 1px;
		color: rgba(255, 255, 255, 0.9);
	}
	${respondTo.xs`
		padding-bottom:0;
		height: 320px;
		width: 400px;
	`}
	${respondTo.sm`
		height: 350px;
		width: 450px;
		padding:1.7rem;
		padding-bottom:1rem;
	`}

		${respondTo.md`
		height: 350px;
		width: 550px;
		padding-bottom:0rem;
	`}
	
		${respondTo.lg` {
		margin-top: 30px;
		height: 370px;
		width: 750px;
		padding:1rem;
	`}
`;

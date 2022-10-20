import { ITask, TaskState } from "@domain/task/task";
import React from "react";
import styled from "styled-components";

export interface TaskProps {
	task: ITask;
	onArchiveTask?: (taskId: string) => void;
	onPinTask?: (taskId: string) => void;
}

export const Task: React.FC<TaskProps> = ({
	task: { id, state, title },
	onArchiveTask,
	onPinTask,
}) => {
	return (
		<ListItem className={`${state}`}>
			<CheckboxLabel htmlFor="checked" aria-label={`archiveTask-${id}`}>
				<StyledInput
					type="checkbox"
					disabled={true}
					name="checked"
					id={`archiveTask-${id}`}
					checked={state === TaskState.TASK_ARCHIVED}
				/>
				<span onClick={() => onArchiveTask?.(id)} />
			</CheckboxLabel>

			<Label htmlFor="title" aria-label={title} className="title">
				<StyledInput
					type="text"
					value={title}
					readOnly={true}
					name="title"
					placeholder="Input title"
				/>
			</Label>

			{state !== TaskState.TASK_ARCHIVED && (
				<PinButton
					onClick={() => onPinTask?.(id)}
					id={`pinTask-${id}`}
					aria-label={`pinTask-${id}`}
					key={`pinTask-${id}`}
				>
					<StarIcon className={`icon-star`} />
				</PinButton>
			)}
		</ListItem>
	);
};

const ListItem = styled.article`
	font-size: 14px;
	line-height: 20px;
	display: flex;
	flex-wrap: wrap;
	height: 3rem;
	width: 100%;
	background: white;
	transition: all ease-out 150ms;

	& .title {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		flex: 1;
	}

	& input[type="text"] {
		background: #ffffff;
		width: 100%;
	}

	& input[type="text"]:focus {
		cursor: text;
	}

	&.TASK_PINNED .icon-star {
		color: #2cc5d2;
	}

	&.TASK_ARCHIVED input[type="text"] {
		color: #4a5568;
		text-decoration: line-through;
	}

	&:hover {
		background-image: linear-gradient(to bottom, #e5f9f7 0%, #f0fffd 100%);
	}

	&:hover .checkbox {
		cursor: pointer;
	}

	& + & {
		border-top: 1px solid #f0f9fb;
	}

	&.checked input[type="text"] {
		color: #ccc;
		text-decoration: line-through;
	}

	&.checked .delete-item {
		display: inline-block;
	}
`;

const Label = styled.label`
	margin: 0;
	padding: 0;
	border: 0;
	font-weight: normal;
	font-style: normal;
	font-size: 100%;
	line-height: 1;
	font-family: inherit;
	vertical-align: baseline;
	*vertical-align: middle;
	line-height: normal;
	*overflow: visible;
	font-family: "Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
`;

const CheckboxLabel = styled(Label)`
	display: inline-block;
	height: 3rem;
	position: relative;
	vertical-align: middle;
	width: 44px;

	& input[type="checkbox"] {
		font-size: 1em;
		visibility: hidden;
	}

	& input[type="checkbox"] + span:before {
		position: absolute;
		top: 50%;
		right: auto;
		bottom: auto;
		left: 50%;
		width: 0.85em;
		height: 0.85em;
		transform: translate3d(-50%, -50%, 0);
		background: transparent;
		box-shadow: #2cc5d2 0 0 0 1px inset;
		content: "";
		display: block;
	}

	& input[type="checkbox"]:checked + span:before {
		font-size: 16px;
		line-height: 24px;
		box-shadow: none;
		color: #2cc5d2;
		margin-top: -1px;
		font-family: "percolate";
		font-style: normal;
		font-weight: normal;
		font-variant: normal;
		text-transform: none;
		line-height: 1;

		content: "\\e65e";
	}
`;

const StyledInput = styled.input`
	&::-moz-focus-inner {
		border: 0;
		padding: 0;
	}

	&[type="button"],
	&[type="reset"],
	&[type="submit"] {
		cursor: pointer;
		-webkit-appearance: button;
	}
	&[type="text"],
	&[type="email"],
	&[type="password"] {
		font-size: 14px;
		line-height: 20px;
		font-family: "Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
		font-style: 400;
		padding: 0.75rem 0;
		line-height: 1.5rem !important;
		border: none;
		border-radius: 0;
		box-sizing: border-box;
		color: #333;
		outline: none;
	}

	text-overflow: ellipsis;
`;

const PinButton = styled.button`
	cursor: pointer;
	-webkit-appearance: button;
	width: 3rem;
	height: 3rem;
	background: transparent;
	border: none;
	text-align: center;
	transition: all 200ms ease-in;
	color: #eee;
	font-size: 16px;
	line-height: 3rem;
	outline: none;

	&:hover {
		color: #2cc5d2;
	}

	&:focus {
		outline-color: transparent;
	}

	&::-moz-focus-inner {
		border: 0;
		padding: 0;
	}

	&:active {
		color: #555;
	}
`;

const StarIcon = styled.span`
	&:before {
		content: "\\e608";
	}
`;

import React, {useState} from "react";
import {useNotesContext} from '../hooks/useNotesContext';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

function CreateArea(props) {
	const [isExpanded, setExpanded] = useState(false);

	const {dispatch} = useNotesContext();

	const [object, updateObject] = useState({
		title: "",
		content: ""
	});
	
	const [error, setError] = useState(null)

	function handleObject (event) {
		const { name, value } = event.target;
		event.preventDefault()

		updateObject((lastValue) => {			
			if (name === "title") {
				return{
					title : value,
					content : lastValue.content
				};					
			} else if (name === "content") {
				return {
					title : lastValue.title,
					content : value
				};
			};			
		});

		console.log(object);
	};

	const handleSubmit = async (e) => {
		e.preventDefault()
		updateObject({
			title: "",
			content: ""
		});

		const response = await fetch('/api/notes', {
			method: 'POST',
			body: JSON.stringify(object),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const json = await response.json();

		if(!response.ok){
			setError(json.error)
			console.log(json.error);
		}
		if (response.ok) {
			setError(null)
			console.log('new note added', json)
			dispatch({type: 'CREATE_NOTE', payload: json})
		}
	};
	// function click(event) { //log to verify object
	// 	console.log(object);
	// 	event.preventDefault();
	// }
	function expand() {
		setExpanded(true);
	}

	return (
		<div>	
			<form>

				{isExpanded && (<input
					name="title"
					placeholder="Title"
					onChange={handleObject}
					value={object.title}
				/>)}

				<textarea
					name="content"
					placeholder="Write a Memento..."
					onChange={handleObject}
					onClick={expand}
					value={object.content}
					rows={isExpanded ? "5" : "3"}
				/>
				<Zoom in={isExpanded}>
					<Fab className="fab" onClick={handleSubmit}>
						<AddCircleRoundedIcon style={{ fontSize: "40px" }}/>
					</Fab>
				</Zoom>
				
			</form>				
			{error && <div className="error">{error}</div>}
		</div>
	)
};

export default CreateArea;

{/* <button onClick={handleSubmit}>Add</button> */}
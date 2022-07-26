import React from 'react';

const Input = ({ setValue, value }) => {
	return (
		<>
			<input
				type='number'
				onChange={event => setValue(event.target.value)}
				className='converter__input'
				value={value}
			/>
		</>
	)
}

export default Input;
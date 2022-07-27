import React from 'react'

const Input = ({ setValue, value}) => {
	function checked(event) {
		setValue(event.target.value)
	}

	return (
		<input
			type='number'
			onChange={event => checked(event)}
			className='converter__input'
			value={value}
		/>
	)
}

export default Input

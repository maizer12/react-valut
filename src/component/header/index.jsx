import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './header.Module.scss'
const Header = () => {
	const [dolar, setDolar] = useState(0)
	const [euro, setEuro] = useState(0)
	useEffect(()=> {
		axios
			.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
			.then(res => {
				setDolar(res.data.filter(e => e.cc === 'USD').map(e => e.rate))
				setEuro(res.data.filter(e => e.cc === 'EUR').map(e => e.rate))
			})
	}, [])
	return (
		<div className='header'>
			<ul className='header__items'>
				<li className='header__item'>USD {dolar}</li>
				<li className='header__item'>EUR {euro}</li>
			</ul>
		</div>
	)
}

export default Header

import React from 'react'
import PromotionOption from './PromotionOption'

interface Props{
	promotionChoiceFunction:(symbol:'q'|'r'|'b'|'n')=>void
	isVisible:boolean,
	top?:string,
	bottom?:string,
	file:number
}

export default function PromotionDialog({isVisible, top, bottom, 
	file, promotionChoiceFunction}:Props) {

	const promotionChoices:{symbol:'q'|'r'|'n'|'b', image:string}[]=[
		{symbol:'q', image:"data:image/png;base64,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"},
		{symbol:'n', image:"data:image/png;base64,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"},
		{symbol:'r', image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABUUExURUxpcQAAAAAAAAAAAAAAAAAAAAICAgAAAAAAAAAAAAAAAAAAAP///y0tLW9vb+jo6Pb29szMzFVVVRISEoeHhyEhIfz8/JiYmLW1tZ+fn0BAQNvb22lBc+oAAAALdFJOUwBDIGywi/oMzu1aBi//9QAAA35JREFUeNrtnNly4yAQRbWC8EQb2vH//+fYjixwIlwTqwFP6p7nLjkn0AhBQxQBAAAAAAAAAAAAAAAAAAAAO3GeWcgTM47HtrgsfQw8WQNj7lDklAkLxcPfl6S2OJY9BubMFvloTC1S/LEgvogwW+BXEVscgwhEIBJeZKg0snsioqQOVJ1dhCnjicqfiDx/bMzqiUivA8dlsIt0fbMF1gtEKESKX9MicWIQPxF5CHxDkSw3WUe3HZFiL/CNRPbZEdkFIhCByPuLtIp1NthkipT2wGEKL9LUT2jGnweGEiEHIhCBCEToRdrGHWePIl3pkiHoKgo5EIEIREKKxJnxU4Okxvy0ESeXGz1JWuhFXbXMxFT64cLtjlXET9qkq+qR8pXezKX2yF12rM/eZbSJPNOZjPW0PZiJ1MOGKM+0Sdk2VCLnSud5EfvZ202F7l4TzfyxWZSRHknkiTgTm4lsKZqj10ssRcp9eUT8Mnpt/UAuh7tXKwdfo9X3cXjLFFb2y3SEpV83s27N4dfjYnLS3WtQxyiZ9kg8e1yrNHJBPSvJTt41PnebaE2Er1H3O7lghB7+Rt292TCVCRM5jwKSZIIqPaKw8FSsW/6vzdzXlYaQ3WqbRH4OwefX1n6qdbLL30fkpYlwDRGIOBEZ0SIQgQhyBCIQQY6ga0EEOYKuBRHkCFoEIsgRtAhEkCNoEYggR9AiEEGOoEUgAhHkCEQg8l+LtPUrtG8jwu/HrvqXKkz79RKUPHSZE09pTpSI0CZk9ZlBKxof6v0PFwOGqzEl9biWZ4Yqa0xIPW6nkYI0hz6ywIZjdCEOKmiPLc/LajnGpO5NW3ivKedbjT9TUz0eo5llp6v8ffer+z+xnGqC8zySBTG5tMfm0R/3uHyXzPfexYRHk3v19dVjpvC4msgAr0b9Ondy6s2bSb69PhThOcSPpvf7kjde5+VrU3crlX7JezCJ9TSRObkj4YaH75OYeF6yD0QgApG3EbFfX3YI7yJqOrcuWOdc/kTk7OQGpEZCBCIQgQhEfp8IN9hEnFxAV28iBmRLo6l59/P6gTgYN8JTsl4fVJg/SbWuEmde5ol2shgiEIGITxG392U+WR+iFpG9b6rOichUf/hlbIffIdJABCIQCZLsVeubxY2IqnyzfpxgigIRiEDkZyJ5EZacarOahyYCAAAAAAAAAAD+mb/KraaCXUGvEwAAAABJRU5ErkJggg=="},
		{symbol:'b', image:"data:image/png;base64,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"},
		
	]
	
	return (
		<div>
			{
				isVisible ? 
				<div className='absolute 
				flex flex-col' 
				style={{
					width:'12.5%',
					height: '50%',
					top:top,
					bottom:bottom,
					left:`${(file/8)*100}%`
				}}>
					{promotionChoices.map((choice)=>{
						return <PromotionOption 
						promotionChoiceFunction={promotionChoiceFunction}
						symbol={choice.symbol} image={choice.image}/>
					})}
				</div>
				: <div/>
			}
		</div>   
	)
}

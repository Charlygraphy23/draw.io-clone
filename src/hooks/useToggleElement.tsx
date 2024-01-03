import { useLayoutEffect, useState } from 'react'

const useToggleElement = (width = 800) => {

	const [isHidden, setIsHidden] = useState(false);

	const toggleHidden = (isHidden = true) => {
		setIsHidden(isHidden);
	};

	useLayoutEffect(() => {
		const handleWidth = () => {
			setIsHidden( window.innerWidth <= width)
		}

		window.addEventListener("resize", handleWidth)

		return () => {
			window.removeEventListener("resize", handleWidth)
		}

	} , [window.innerWidth])

  return {toggleHidden , isHidden}
}

export default useToggleElement
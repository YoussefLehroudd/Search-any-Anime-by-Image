/** @format */
import { useEffect } from 'react';
import Fileupload from 'Components/Fileupload/Fileupload';
import Results from 'Components/Resultcard/Results';
import { GlobalStyle } from 'styles/GlobalStyle';
import VideoBackground from 'Components/Ui/VideoBackground';
import Navbar from 'Components/Navbar';
import { ContextProvider } from 'store/Context-Provider';
import { ServerError, UserError } from 'Components/Ui/Errorcard';

function App() {
	useEffect(() => {
		document.body.style.height = window.innerHeight + 'px';
		const setheight = () => {
			document.body.style.height = window.innerHeight + 'px';
		};
		window.addEventListener('resize', setheight);

		return () => {
			window.removeEventListener('resize', setheight);
		};
	}, []);

	return (
		<div className="App">
			<VideoBackground />
			<GlobalStyle />
			<Navbar />
			<ContextProvider>
				<Fileupload />
				<Results />
				<UserError />
				<ServerError />
			</ContextProvider>
		</div>
	);
}

export default App;

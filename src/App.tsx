import GlobalSvgSprite from './shared/ui/GlobalSvgSprite';
import { Routing } from './app/routes';
import { ThemeProvider } from './app/providers/ThemeProvider';

function App() {
  return (
    <ThemeProvider>
      <GlobalSvgSprite />
      <Routing />
    </ThemeProvider>
  );
}

export default App;

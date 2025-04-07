import OllamaButton from "../../../components/ollama/button.ollama";
import { Button } from "../../../components/ui/button";
import SEOPageProvier from "../../../providers/seo.provider";

function App() {
  return (
    <SEOPageProvier
      info={{
        title: "User App",
      }}
    >
      <section className="relative min-w-screen min-h-screen">
        <OllamaButton className="absolute bottom-[10%] right-[2%]" />
        <h1>User App</h1>
        <div className="flex flex-col items-center justify-center min-h-svh">
          <Button>Click me</Button>
        </div>
      </section>
    </SEOPageProvier>
  );
}

export default App;

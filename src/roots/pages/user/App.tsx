import OllamaButton from "../../../components/ollama/button.ollama";
import SEOPageProvier from "../../../providers/seo.provider";

function App() {
  return (
    <SEOPageProvier
      info={{
        title: "User App",
      }}
    >
      <section className="relative min-w-screen min-h-screen">
        <OllamaButton className="absolute bottom-[10%] right-[2%]"/>
        <h1>User App</h1>
      </section>
    </SEOPageProvier>
  );
}

export default App;

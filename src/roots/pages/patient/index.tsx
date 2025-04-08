import React from "react";
import SEOPageProvier from "../../../providers/seo.provider";
import OllamaButton from "../../../components/ollama/button.ollama";
import { Button } from "../../../components/ui/button";
import { Link } from "react-router";

const PatientHomePage: React.FC = () => {
  return (
    <SEOPageProvier
      info={{
        title: "Trang chủ",
      }}
    >
      <section>
        <OllamaButton className="absolute bottom-[10%] right-[2%]" />
        <h1>User App</h1>
        <Link to="/admin">
          <Button>Go to admin</Button>
        </Link>
        <Link to="/staff">
          <Button>Go to staff</Button>
        </Link>
        <Link to="/dentist">
          <Button>Go to dentist</Button>
        </Link>
      </section>
    </SEOPageProvier>
  );
};

export default PatientHomePage;

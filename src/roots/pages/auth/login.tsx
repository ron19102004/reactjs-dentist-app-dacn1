import React, { use } from "react";
import { AuthContext } from "../../../contexts/auth.context";
import { Button } from "../../../components/ui/button";

const LoginPage: React.FC = () => {
  const [username, setUsername] = React.useState<string>("");
  const { login } = use(AuthContext);

  const handleSubmit = async () => {
    await login({
      password: "",
      username: username,
    });
  };

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <Button onClick={handleSubmit}>submit</Button>
    </div>
  );
};

export default LoginPage;

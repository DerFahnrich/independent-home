import { Login } from "./Login";

export const App = (): JSX.Element => {
  const fetchLogos = async () => {
    const url = "/api/internal/v2/branding/logo";
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);
  };

  const fetchCustomers = async () => {
    const url = "/api/internal/customers";
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);
  };
  return (
    <div>
      This is the app
      <Login />
      <button onClick={fetchLogos}>Fetch Logos</button>
      <button onClick={fetchCustomers}>Fetch hjasioudfghiuashdfgiashfgiuashfpiughsa</button>
    </div>
  );
};

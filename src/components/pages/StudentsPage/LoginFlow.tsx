/** @jsxImportSource @emotion/react */

interface LoginFlowProps {
  pin: number;
  setPin: React.Dispatch<React.SetStateAction<number>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
}

export default function LoginFlow({
  pin,
  setPin,
  setName,
}: LoginFlowProps): JSX.Element {
  return <div>Login Flow placeholder</div>;
}

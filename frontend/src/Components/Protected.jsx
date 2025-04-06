import { useRecoilValue } from "recoil";
import { authtoken } from "./Recoil_state";
import Register from "./Register";

export default function Protected({ children }) {
  const token = useRecoilValue(authtoken); // useRecoilState provides both read and write access but useRecoilValue provides only read access
  if (!token) {
    return <Register />;
  }
  return <div>{children}</div>;
}

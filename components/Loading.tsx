import { ImSpinner6 } from "react-icons/im";

const Loading = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <ImSpinner6 size={40} className="animate-spin text-primary" />
    </div>
  );
};

export default Loading;

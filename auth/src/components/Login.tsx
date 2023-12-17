import React from "react";

import useShellStore from "shell/useShellStore";

const Login = () => {
  const { count, increment, decrement } = useShellStore();

  return (
    <div className="p-2">
      <div className="border-2 border-red-500 p-2">
        <div>App: auth</div>
        <div>Port: 3002</div>
        <div>Count {count}</div>
        <div
          className="border-1 border-black rounded-xl  bg-green-400 p-1 w-44 text-center cursor-pointer"
          onClick={() => increment()}
        >
          Increment
        </div>
        <div
          className="border-1 border-black rounded-xl  bg-red-400 p-1 w-44 text-center cursor-pointer"
          onClick={() => decrement()}
        >
          Decrement
        </div>
      </div>
    </div>
  );
};

export default Login;

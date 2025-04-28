import React, { useCallback, useState, useEffect, useRef } from "react";

const App = () => {
  const [length, setLength] = useState(8);
  const [isNumberAllowed, setIsNumberAllowed] = useState(false);
  const [isCharAllowed, setIsCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passRef = useRef(null);

  const copyPassword = useCallback(() => {
    passRef.current?.select();
    passRef.current?.setSelectionRange(0,999);
    window.navigator.clipboard.writeText(password);
  },[password]);

  const passwordGenerator = useCallback(() => {
    let pass = "";

    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (isNumberAllowed) str += "0123456789";
    if (isCharAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, isNumberAllowed, isCharAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, isCharAllowed, isNumberAllowed, passwordGenerator]);

  return (
    <div
      className="w-full h-screen flex justify-center items-center lg:items-start"
      style={{ background: "linear-gradient(to top, #141414, #6d6b6b)" }}
    >
      <div className="w-full max-w-md mx-auto shadow-lg rounded-lg px-6 py-4 my-8 bg-gray-900 text-blue-500">
        <h1 className="text-white text-center text-2xl my-4">
          Password Generator
        </h1>

        <div className="flex items-center shadow rounded-lg overflow-hidden mb-6 bg-gray-800">
          <input
            type="text"
            className="w-full px-4 py-2 text-gray-100 bg-transparent border-none focus:outline-none"
            readOnly
            value={password}
            placeholder="Generated Password"
            ref={passRef}
          />
          <button 
          className="outline-none bg-blue-700 text-white px-4 py-2 hover:bg-blue-800"
          onClick={copyPassword}
          >
            Copy
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between text-sm">
            <label className="text-gray-400">
              Length: <div className="text-blue-500 font-bold">{length}</div>
            </label>
            <input
              type="range"
              className="w-full "
              min={6}
              max={44}
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
          </div>

          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-x-2">
              <input
                type="checkbox"
                className="h-4 w-4"
                defaultChecked={isNumberAllowed}
                onChange={() => {
                  setIsNumberAllowed((prev) => !prev);
                }}
              />
              <label>Numbers</label>
            </div>
            <div className="flex items-center gap-x-2">
              <input
                type="checkbox"
                className="h-4 w-4"
                defaultChecked={isCharAllowed}
                onChange={() => {
                  setIsCharAllowed((prev) => !prev);
                }}
              />
              <label>Characters</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

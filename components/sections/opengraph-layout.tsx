import { PropsWithChildren } from "react";

export function OpenGraphLayout({ children }: PropsWithChildren) {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        // alignItems: "center",
        backgroundColor: "black",
        padding: "100px 120px 0",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="200"
        height="200"
        fill="none"
        viewBox="0 0 500 500"
      >
        <path
          fill="#fff"
          d="M159.95 286.25c-31.3 31.3-72.84 40.51-92.78 20.57-19.94-19.94-10.73-61.48 20.57-92.78 31.3-31.3 72.84-40.51 92.78-20.57 16.8 16.8 12.91 48.93-7.45 77.35-3.81 5.31-8.19 10.5-13.12 15.42v.01zM424.78 280.49c-26.08 35.76-78.36 44.81-87.27 16.44-8.45-26.9-21.32-40.84 4.76-76.61 26.08-35.76 65.91-51.59 88.48-34.67 15.48 11.61 20.11 59.08-5.97 94.84zM303.85 218.427c47.379-64.973 72.793-127.119 56.764-138.807-16.029-11.689-67.431 31.507-114.81 96.479-47.379 64.973-72.793 127.119-56.764 138.807 16.029 11.689 67.431-31.506 114.81-96.479z"
        ></path>
        <path
          fill="#fff"
          d="M325.44 320.07c-47.38 64.97-95.98 110.21-108.55 101.04-12.58-9.17 15.64-69.27 63.01-134.24 47.38-64.97 104.38-112.01 116.95-102.84 12.58 9.17-24.03 71.07-71.41 136.05v-.01z"
        ></path>
      </svg>

      <div style={{ height: "50px" }}></div>
      {children}
    </div>
  );
}

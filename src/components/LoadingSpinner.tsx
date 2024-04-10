export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-[91vh] w-screen">
      <span className="visually-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
          style={{
            shapeRendering: "auto",
            display: "block",
            background: "transparent",
          }}
          width="200"
          height="200"
        >
          <g>
            <circle cx="30" cy="50" fill="var(--secondary)" r="20">
              <animate
                attributeName="cx"
                repeatCount="indefinite"
                dur="1.6129032258064517s"
                keyTimes="0;0.5;1"
                values="30;70;30"
                begin="-0.8064516129032259s"
              ></animate>
            </circle>
            <circle cx="70" cy="50" fill="var(--primary)" r="20">
              <animate
                attributeName="cx"
                repeatCount="indefinite"
                dur="1.6129032258064517s"
                keyTimes="0;0.5;1"
                values="30;70;30"
                begin="0s"
              ></animate>
            </circle>
            <circle cx="30" cy="50" fill="var(--secondary)" r="20">
              <animate
                attributeName="cx"
                repeatCount="indefinite"
                dur="1.6129032258064517s"
                keyTimes="0;0.5;1"
                values="30;70;30"
                begin="-0.8064516129032259s"
              ></animate>
              <animate
                attributeName="fill-opacity"
                values="0;0;1;1"
                calcMode="discrete"
                keyTimes="0;0.499;0.5;1"
                dur="1.6129032258064517s"
                repeatCount="indefinite"
              ></animate>
            </circle>
          </g>
        </svg>
      </span>
    </div>
  );
}

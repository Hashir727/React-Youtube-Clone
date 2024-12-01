export const ShimmerOverlay = ({ width, height }) => (
  <div
    style={{
      width: `${width}px`,
      height: `${height}px`,
      position: "absolute",
      zIndex: 1,
      background:
        "linear-gradient(-90deg, #f6f7f8 25%, #e0e0e0 50%, #f6f7f8 75%)",
      backgroundSize: "200% 200%",
      animation: "shimmer 1.5s infinite",
    }}
  />
);
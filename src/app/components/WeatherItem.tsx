import React from "react";

type WeatherItemProps = {
  label: string;
  value: string | number | null | undefined;
  className: string;
};

const WeatherItem: React.FC<WeatherItemProps> = (
  { label, value, className },
) => {
  return (
    <div className={className}>
      <strong>{label}:&#32;{value ? value : "Loading..."}</strong>
    </div>
  );
};

export default WeatherItem;

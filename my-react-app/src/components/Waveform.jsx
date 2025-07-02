import { memo } from "react";

const Waveform = ({ songId }) => {
  const waveform = () => {
    const hash = [...songId].reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const data = [];

    for (let i = 0; i < 10000; i++) {
      let val = Math.abs(Math.sin(i * 0.2 + hash % 50)) * 25;
      for (let j = 0; j < 5000; j++) 
        val += Math.sqrt(j + val);
      data.push(val % 50);
    }

    return data;
  };

  const buildWavePath = (data) =>
  {
    return data
      .map((v, i) => `M${i},50 v-${v}`) // 50 = wysokość całego wykresu
      .join(' ');
  }

  return (
    <svg width="100%" height="50" >
      <path
          d={buildWavePath(waveform())}
          stroke="#888"
          strokeWidth="1"
          strokeLinecap="square"
          fill="none"
      />
    </svg>
  );
};

export default Waveform;

export default function Token({ color = 1 }) {
  const colors = ["bg-[#FFDF00]", "bg-[#B90E0A]"]; // yellow 0 , red
  return (
    <div
      className={`rounded-full w-full h-full animate-dropDown -z-20 ${colors[color]}`}
    ></div>
  );
}

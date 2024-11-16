import ShieldSVG from "@/assets/Captain_America_Shield.svg";

const ShieldSpinner = ({ size = 100 }) => {
  return (
    <img
      src={ShieldSVG}
      alt="Loading..."
      className="animate-spin aspect-square"
      style={{
        width: size,
        height: size,
      }}
    />
  );
};

export default ShieldSpinner;

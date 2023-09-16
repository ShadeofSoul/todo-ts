const CheckIcon = ({ checked }: { checked: boolean }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="8"
        cy="8"
        r="7.5"
        stroke={checked ? "#3DF4BD" : "#CCCCCC"}
        fill={checked ? "#3DF4BD" : "transparent"}
      />
      <path
        d="M12.2248 5.54644L6.45454 11.3167L4.56892 9.43109"
        stroke={checked ? "#FFFFFF" : "#CCCCCC"}
      />
    </svg>
  );
};

export default CheckIcon;

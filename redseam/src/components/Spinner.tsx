const Spinner = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div
        className="w-12 h-12 border-4 border-[#FF4000] border-t-transparent rounded-full animate-spin"
      />
    </div>
  );
};

export default Spinner;
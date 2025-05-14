const Banner = () => {
  return (
    <div className="relative w-full h-[350px] overflow-hidden rounded-xl shadow-lg">
     
      {/* Nội dung text nổi */}
      <div className="absolute inset-0 flex flex-col justify-center items-start px-10 bg-black/30 text-white">
        <h2 className="text-4xl font-bold mb-2">
          NHÂN DỊP 30/04 - KỶ NIỆM 50 NĂM GIẢI PHÓNG <br />
          <span className="text-green-300">SIÊU KHUYẾN MÃI -30%</span>
        </h2>
        <p className="text-md bg-white text-green-700 px-3 py-1 rounded mt-2">
          Chương trình từ 30.4 - 2.9.2025
        </p>
      </div>
    </div>
  );
};

export default Banner;

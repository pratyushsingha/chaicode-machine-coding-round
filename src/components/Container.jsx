const Container = ({ children, bg = "", textColor = "" }) => {
  return (
    <div className={` ${bg} min-h-screen`}>
      <h1 className={`${textColor} h1 flex justify-center py-3`}>
        Chai aur code
      </h1>
      {children}
      <div className="flex justify-end mx-3">
        <a href="https://chaicode.com" target="_blank">
          <img className="w-20 h-20" src="/chai.png" alt="" />
        </a>
      </div>
    </div>
  );
};
export default Container;

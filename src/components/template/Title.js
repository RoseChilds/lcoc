function Title(props){
  return <div className={`text-3xl mb-4 lg:w-1/2 lg:ml-[25%] text-center font-bold ${props?.className || ""}`}>
    {props.children}
    <div className={`mr-4 ml-4 mt-2 border-b ${props.borderColor || "border-black/50"}`}/>
  </div>
}

export default Title;

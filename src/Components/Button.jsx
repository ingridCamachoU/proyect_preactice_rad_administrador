
const Button = ({className, text, onClick, item}) => {
  return (
        <>
            <button type="button" className={className} 
            onClick={()=> {onClick(item)}}>
                {text}
            </button> 
        </>
    );
}

export default Button;


type ButtonProps = {
    text: string;
    onClick: () => void;
}

const Button = (props: ButtonProps) => {
    return(
        <button style={{width: '20vw', height: '10vh', backgroundColor: 'blue', color: 'white'}} onClick={props.onClick}>{props.text}</button>
    )
}

export default Button;
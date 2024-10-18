import React from 'react';

const Button = (props: {
    className: string;
    text: string;
    onClickFunc: Function;
}) => {
    const { className, text, onClickFunc } = props;
    return (
        <button
            type='submit'
            className={`w-full bg-primary text-[#FFFDFD] py-3 transition-all  duration-500 delay-0 ease-in-out rounded-lg font-medium hover:bg-secondary ${className}`}
            onClick={() => onClickFunc()}
        >
            {text}
        </button>
    );
};

export default Button;

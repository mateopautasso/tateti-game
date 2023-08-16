export function Square({children, isSelected, updateBoard, index}) {

    return(
        <div onClick={()=>updateBoard(index)} className={`square ${isSelected ? 'is-selected' : ''}`}>
            <span className='cell__content'>
            {children}
            </span>
        </div>
    )
}
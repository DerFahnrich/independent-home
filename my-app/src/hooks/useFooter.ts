import {useState} from "react";
import Row from "@interfaces/IRow";
import {TDirection} from "@interfaces/types";

interface IUseFooterReturnValue {
    disabledButtons: IDisabledButtons
    slicedData: Row[];
    updateIndex: (direction: TDirection) => void,
}

interface IDisabledButtons {
    left: boolean;
    right: boolean;
}

const useFooter = (data: Row[]): IUseFooterReturnValue => {
    const [index, setIndex] = useState(0);

    const numberOfRows = 4;
    const slicedData = data.slice(index, (index + numberOfRows));

    const disabledButtons: IDisabledButtons = {
        left: (index - numberOfRows) < 0,
        right: (index + numberOfRows) >= data.length
    }

    const updateIndex = (direction: TDirection) => {
        setIndex(prevState => (
            direction === "LEFT" ? prevState - numberOfRows : prevState + numberOfRows)
        );
    }

    return {disabledButtons, slicedData, updateIndex, } as IUseFooterReturnValue;
}

export default useFooter;

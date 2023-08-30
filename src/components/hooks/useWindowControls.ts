import { useLayoutStore } from '@stores/layout';

const useWindowControls = () => {
    const handleMinimize = useLayoutStore((state) => state.handleMinimize);
    const handleMaximize = useLayoutStore((state) => state.handleMaximize);
    const handleClose = useLayoutStore((state) => state.handleClose);
    return { handleMinimize, handleMaximize, handleClose };
};

export default useWindowControls;

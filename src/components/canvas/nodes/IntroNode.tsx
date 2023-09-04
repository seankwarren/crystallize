import './styles/IntroNode.css';

type Props = {
    id: string,
    data: NodeData
}

const IntroNode = ({ id, data }: Props) => {

    const { label } = data;
    return (
        <div id={id} className="intro-node">
            {label}
        </div>
    )
}

export default IntroNode;

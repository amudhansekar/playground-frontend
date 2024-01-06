interface Props {
  heading: string;
}

function PlaygroundHeader(props: Props): JSX.Element {
  const { heading } = props;
  return (
    <h1 className="mt-4 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
      {heading}
    </h1>
  );
}

export default PlaygroundHeader;

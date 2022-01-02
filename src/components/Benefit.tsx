interface Props {
  header: string;
  description: string;
}

const Benefit = (props: Props) => (
  <div className="mb-2">
    <h2 className="font-semibold">⭐ {props.header}</h2>
    <p
      className="font-light"
      dangerouslySetInnerHTML={{ __html: props.description }}
    ></p>
  </div>
);

export default Benefit;

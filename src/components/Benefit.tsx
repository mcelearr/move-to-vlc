interface Props {
  header: string;
  description: string;
}

const Benefit = (props: Props) => (
  <div>
    <h2 className="font-semibold">⭐ {props.header}</h2>
    <p className="font-light">{props.description}</p>
  </div>
);

export default Benefit;

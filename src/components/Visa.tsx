interface Props {
  emoji: string;
  description: string;
  linkText: string;
  linkUrl: string;
}

const Visa = (props: Props) => (
  <a href={props.linkUrl} target="_blank">
    <div className="bg-white border border-gray-200 mb-2 px-4 py-4 rounded-md">
      <h3 className="dark:text-gray-800 font-semibold">
        {props.emoji}{" "}
        <span className="dark:text-gray-800 ml-1 underline underline-offset-4">
          {props.linkText}
        </span>
      </h3>
      <p className="dark:text-gray-800 font-light">{`${props.description}`}</p>
    </div>
  </a>
);

export default Visa;

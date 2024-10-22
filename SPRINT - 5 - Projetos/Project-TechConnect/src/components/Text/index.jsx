export const Title = (props) => {
  return <h1 className="text-primary text-2xl max-sm:text-lg">{props.children}</h1>;
};

export const SubTitle = (props) => {
  return <h1 className="text-primary/75 text-lg text-center max-sm:text-base">{props.children}</h1>;
};

export const PageTitle = (props) => {
  return (
    <h1 className="text-primary text-2xl underline uppercase">
      {props.children}
    </h1>
  );
};

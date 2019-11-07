import * as React from "react";

type Props = {
  color?: string;
};

const PageContainer: React.FunctionComponent<Props> = ({
  children,
  color = "#222222",
}) => {
  return (
    <div className="background">
      {children}
      <style jsx>{`
        .background {
          background-color: ${color};
          height: ${window.innerHeight - 56}px;
        }
      `}</style>
    </div>
  );
};

export default PageContainer;

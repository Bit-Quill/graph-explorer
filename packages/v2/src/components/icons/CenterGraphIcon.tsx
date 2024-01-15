import type { IconBaseProps } from "./IconBase";
import IconBase from "./IconBase";

export const CenterGraphIcon = (props: IconBaseProps) => {
  return (
    <IconBase {...props}>
      <path
        d="M16 9C16 10.1046 15.1046 11 14 11C13.5001 11 13.043 10.8166 12.6924 10.5134L10.951 11.5582C10.9831 11.7004 11 11.8482 11 12C11 12.1518 10.9831 12.2997 10.951 12.4418L12.6924 13.4867C13.043 13.1835 13.5001 13 14 13C15.1046 13 16 13.8954 16 15C16 16.1046 15.1046 17 14 17C12.8954 17 12 16.1046 12 15C12 14.8483 12.0169 14.7004 12.0489 14.5583L10.3075 13.5134C9.95691 13.8167 9.49988 14 9 14C7.89542 14 7 13.1046 7 12C7 10.8954 7.89542 10 9 10C9.49991 10 9.95697 10.1834 10.3076 10.4866L12.049 9.44177C12.0169 9.29962 12 9.15179 12 9C12 7.89545 12.8954 7 14 7C15.1046 7 16 7.89545 16 9Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13 0H11V3.05493C6.8284 3.51605 3.51608 6.82837 3.05493 11H0V13H3.05493C3.51608 17.1716 6.8284 20.4839 11 20.9451V24H13V20.9451C17.1716 20.4839 20.4839 17.1716 20.9451 13H24V11H20.9451C20.4839 6.82837 17.1716 3.51605 13 3.05493V0ZM19.5 12C19.5 16.1421 16.1422 19.5 12 19.5C7.85785 19.5 4.5 16.1421 4.5 12C4.5 7.85785 7.85785 4.5 12 4.5C16.1422 4.5 19.5 7.85785 19.5 12Z"
        fill="currentColor"
      />
    </IconBase>
  );
};

export default CenterGraphIcon;
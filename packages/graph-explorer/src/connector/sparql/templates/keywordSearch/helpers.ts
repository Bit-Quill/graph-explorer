import { escapeString } from "../../../../utils";

export const getSubjectClasses = (subjectClasses?: string[]) => {
  if (!subjectClasses?.length) {
    return "";
  }

  let filterByClass = "";
  filterByClass += "FILTER (?class IN (";
  subjectClasses.forEach((sc, i) => {
    filterByClass += `<${sc}>`;
    if (i < subjectClasses.length - 1) {
      filterByClass += ", ";
    }
  });
  filterByClass += "))";
  return filterByClass;
};

export const getFilterPredicates = (predicates?: string[]) => {
  if (!predicates?.length) {
    return "";
  }

  let filterByAttributes = "";
  filterByAttributes += "FILTER (?predicate IN (";
  predicates.forEach((p, i) => {
    filterByAttributes += `<${p}>`;
    if (i < predicates.length - 1) {
      filterByAttributes += ", ";
    }
  });
  filterByAttributes += "))";
  return filterByAttributes;
};

export const getFilterObject = (exactMatch: boolean, searchTerm?: string) => {
  if (!searchTerm) {
    return "";
  }

  const escapedSearchTerm = escapeString(searchTerm);

  let filterBySearchTerm = "";
  if (exactMatch === true) {
    filterBySearchTerm = `FILTER (?value = "${escapedSearchTerm}")`;
  } else {
    filterBySearchTerm = `FILTER (regex(str(?value), "${escapedSearchTerm}", "i"))`;
  }
  return filterBySearchTerm;
};

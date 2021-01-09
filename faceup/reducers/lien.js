export default function (data = [], action) {
  if (action.type === "datasaved") {
    return [...data, action.data];
  } else {
    return data;
  }
}

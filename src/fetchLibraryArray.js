export default function fetchArr(arr, name) {
  return arr.find((project) => {
    return project.name === name;
  });
}

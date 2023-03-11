export default function populateLocalStorage(arr) {
  sessionStorage.setItem('testStorage', JSON.stringify(arr));
}

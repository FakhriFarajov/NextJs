export const fetchUsers = async () => {
  const res = await fetch('https://api.github.com/users');
  if (!res.ok) {
    throw new Error('Failed to fetch users');
  }
  var data = await res.json();
  return data;
}
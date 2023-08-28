const BASE_URL = "https://mystage.artelelectronics.com/api/v1";

export async function patchAPI(url, data) {
  const user = JSON.parse(localStorage.getItem("token"));

  const response = await fetch(BASE_URL + url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.token?.access}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }

  const responseData = await response.json();
  return responseData;
}

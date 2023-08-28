const BASE_URL = "https://mystage.artelelectronics.com/api/v1";
export async function getAPI(url, body) {
  const user = JSON.parse(localStorage.getItem("token"));

  const options = {
    method: "GET",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.token?.access}`,
    },
  };

  try {
    const response = await fetch(BASE_URL + url, options);
    if (response.status === 401) {
      window.location.href = "/#/auth/signin";
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

const BASE_URL = "https://mystage.artelelectronics.com/api/v1";

export async function postAPI(url, body, redirectUrl) {
  const user = JSON.parse(localStorage.getItem("token"));

  const options = {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (user && !url.includes("/login")) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${user?.token?.access}`,
    };
  }

  return fetch(BASE_URL + url, options)
    .then((res) => res.json())
    .then((response) => {
      if (!user) {
        localStorage.setItem("token", JSON.stringify(response));
      }
      return response;
    })
    .then((data) => {
      if (data) {
        window.location.href = redirectUrl;
      }
      return data;
    })
    .catch((err) => {
      return err.message;
    });
}

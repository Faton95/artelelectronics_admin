const BASE_URL = 'https://mystage.artelelectronics.com/api/v1'
export async function postAPI(url, body) {
    const user = JSON.parse(localStorage.getItem('token'))

    const options = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        },
    }

    if(user && !url.includes('/login')) {
        options.headers = {
            ...options.headers,
            Authorization: `Bearer ${user?.token?.access}`
        }
    }

    fetch(BASE_URL+url, options )
        .then((res) => res.json())
        .then((response) => {
            if (response?.detail !== undefined) {
                throw new Error('Network response was not ok');
            }
            if(!user){
                localStorage.setItem('token', JSON.stringify(response))
            }
            return response;
        }).then(data => {
        if(data) {
            window.location.href = '/#/admin/dashboard'
        }
    })
        .catch((err) => {
            console.log(err.message);
        });
}